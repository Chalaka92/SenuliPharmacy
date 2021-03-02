using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Create
    {
        public class Command : IRequest<string>
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
                RuleFor(x => x.TotalAmount).GreaterThan(0);
                RuleFor(x => x.TotalNetAmount).GreaterThan(0);
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
                _context = context;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = _mapper.Map<Command, Order>(request);
                var orderCode = "odr" + DateTime.Now.ToString("yyyyMMdd") + "_001";
                var filterCode = "odr" + DateTime.Now.ToString("yyyyMMdd") + "_";

                if (await _context.Orders.AnyAsync(x => x.OrderCode.Substring(0, x.OrderCode.Length - 3) == filterCode))
                {
                    orderCode = "odr" + DateTime.Now.ToString("yyyyMMdd") + "_" + (_context.Orders.AsEnumerable().Where(x => x.OrderCode.Substring(0, x.OrderCode.Length - 3) == filterCode)
                        .Max(x => Convert.ToInt32(x.OrderCode.Substring(x.OrderCode.Length - 3, 3))) + 1).ToString("D3");
                }
                order.OrderCode = orderCode;

                var loggedUser = await _userManager.FindByEmailAsync(request.LoginEmail);
                var userDetail = await _context.UserDetails.FirstOrDefaultAsync((x => x.LoggedUserId == loggedUser.Id));

                order.UserId = userDetail.Id;
                await _context.Orders.AddAsync(order);

                request.OrderItemBatches.ToList().ForEach(async x =>
                {
                    // var order = await _context.Orders.FindAsync(x.OrderId);
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

                if (success) return order.OrderCode;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}