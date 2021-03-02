using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OrderItemBatches
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int OrderId { get; set; }
            public int ItemBatchId { get; set; }
            public string OrderItembatchCode { get; set; }
            public string Name { get; set; }
            public int ItemCount { get; set; }
            public decimal ItemPrice { get; set; }
            public decimal NetPrice { get; set; }
            public decimal TotalNetPrice { get; set; }
            public decimal ShopOwnerDiscountRate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.OrderId).GreaterThan(0);
                RuleFor(x => x.ItemBatchId).GreaterThan(0);
                RuleFor(x => x.ItemCount).GreaterThan(0);
                RuleFor(x => x.Name).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var orderItemBatch = await _context.OrderItemBatches.FindAsync(request.Id);

                if (orderItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { orderItemBatch = "Not Found" });

                orderItemBatch.OrderId = request.OrderId == 0 ? orderItemBatch.OrderId : request.OrderId;
                orderItemBatch.ItemBatchId = request.ItemBatchId == 0 ? orderItemBatch.ItemBatchId : request.ItemBatchId;
                orderItemBatch.ItemCount = request.ItemCount == 0 ? orderItemBatch.ItemCount : request.ItemCount;
                orderItemBatch.Name = request.Name ?? orderItemBatch.Name;
                orderItemBatch.ItemPrice = request.ItemPrice;
                orderItemBatch.ShopOwnerDiscountRate = request.ShopOwnerDiscountRate;
                orderItemBatch.NetPrice = request.NetPrice;
                orderItemBatch.TotalNetPrice = request.TotalNetPrice;

                //Update Order
                var order = await _context.Orders.FindAsync(orderItemBatch.OrderId);
                var alterTotalAmount = (request.NetPrice * request.ItemCount) - (orderItemBatch.NetPrice * orderItemBatch.ItemCount);
                order.TotalAmount += alterTotalAmount;
                order.TotalNetAmount += alterTotalAmount * (1 - (order.TotalBillDiscount / 100));

                //Update ItemBatch
                var itemBatch = await _context.ItemBatches.FindAsync(orderItemBatch.ItemBatchId);
                itemBatch.ItemCount -= (request.ItemCount - orderItemBatch.ItemCount);
                itemBatch.ReorderCount += (request.ItemCount - orderItemBatch.ItemCount);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}