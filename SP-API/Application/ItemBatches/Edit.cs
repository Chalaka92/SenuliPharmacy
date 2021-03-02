using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ItemBatches
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int ItemId { get; set; }
            public int ItemStatusId { get; set; }
            public int StockCount { get; set; }
            public int ItemCount { get; set; }
            public int ReorderCount { get; set; }
            public string ItemBatchCode { get; set; }
            public string Name { get; set; }
            public decimal MaxRetailPrice { get; set; }
            public DateTime ManufactureDate { get; set; }
            public DateTime ExpiryDate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.ManufactureDate).NotNull();
                RuleFor(x => x.ExpiryDate).NotNull();
                RuleFor(x => x.ItemId).GreaterThan(0);
                RuleFor(x => x.ItemStatusId).GreaterThan(0);
                RuleFor(x => x.ItemCount).GreaterThan(0);
                RuleFor(x => x.StockCount).GreaterThan(0);
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
                var itemBatch = await _context.ItemBatches.FindAsync(request.Id);

                if (itemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { itemBatch = "Not Found" });

                itemBatch.Name = request.Name ?? itemBatch.Name;
                itemBatch.MaxRetailPrice = request.MaxRetailPrice;
                itemBatch.ItemCount = request.ItemCount;
                itemBatch.StockCount = request.StockCount;
                itemBatch.ReorderCount = request.ReorderCount;
                itemBatch.ManufactureDate = request.ManufactureDate;
                itemBatch.ExpiryDate = request.ExpiryDate;
                itemBatch.ItemId = request.ItemId == 0 ? itemBatch.ItemId : request.ItemId;
                itemBatch.ItemStatusId = request.ItemStatusId == 0 ? itemBatch.ItemStatusId : request.ItemStatusId;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}