using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string LoginEmail { get; set; }
            public int Id { get; set; }
            public string OrderCode { get; set; }
            public decimal TotalAmount { get; set; }
            public decimal TotalBillDiscount { get; set; }
            public decimal TotalNetAmount { get; set; }
            public bool IsComplete { get; set; }
            public DateTime? CompletedDate { get; set; }
            public DateTime OrderedDate { get; set; }
            public bool IsEdit { get; set; }
            public DateTime? EditedDate { get; set; }
            public int EditedUserId { get; set; }
            public bool IsCancel { get; set; }
            public DateTime? CanceledDate { get; set; }
            public int CanceledUserId { get; set; }
            public string CanceledReason { get; set; }
            public virtual ICollection<OrderItemBatch> OrderItemBatches { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.LoginEmail).NotEmpty();
                RuleFor(x => x.TotalAmount).GreaterThan(0);
                RuleFor(x => x.TotalNetAmount).GreaterThan(0);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.FindAsync(request.Id);

                if (order == null)
                    throw new RestException(HttpStatusCode.NotFound, new { order = "Not Found" });

                var loggedUser = await _userManager.FindByEmailAsync(request.LoginEmail);
                var userDetail = await _context.UserDetails.FirstOrDefaultAsync((x => x.LoggedUserId == loggedUser.Id));

                order.TotalAmount = request.TotalAmount;
                order.TotalNetAmount = request.TotalNetAmount;
                order.TotalBillDiscount = request.TotalBillDiscount;
                if (request.IsEdit)
                {
                    order.IsEdit = request.IsEdit;
                    order.EditedDate = request.EditedDate;
                    order.EditedUserId = userDetail.Id;
                }
                if (request.IsCancel)
                {
                    order.IsCancel = request.IsCancel;
                    order.CanceledDate = request.CanceledDate;
                    order.CanceledUserId = userDetail.Id;
                    order.CanceledReason = request.CanceledReason;
                }

                var savedOrderItemBatches = await _context.OrderItemBatches.Where(y => y.OrderId == order.Id).ToListAsync();
                savedOrderItemBatches.ForEach(async x =>
                {
                    _context.OrderItemBatches.Remove(x);

                    //Update ItemBatch
                    var itemBatch = await _context.ItemBatches.FindAsync(x.ItemBatchId);
                    itemBatch.ItemCount += x.ItemCount;
                    itemBatch.ReorderCount -= x.ItemCount;
                });

                request.OrderItemBatches.ToList().ForEach(async x =>
               {
                   var itemBatch = await _context.ItemBatches.FindAsync(x.ItemBatchId);
                   var orderItemBatchCode = order.OrderCode.Replace("odr", "") + itemBatch.ItemBatchCode.Replace("bch", "");

                   x.OrderItemBatchCode = orderItemBatchCode;
                   x.OrderId = order.Id;
                   await _context.OrderItemBatches.AddAsync(x);

                   //Update ItemBatch
                   itemBatch.ItemCount -= x.ItemCount;
                   itemBatch.ReorderCount += x.ItemCount;
               });

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}