using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ItemBatches
{
    public class Create
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var itemBatch = _mapper.Map<Command, ItemBatch>(request);
                var item = await _context.Items.FindAsync(request.ItemId);
                var itemBatchCode = "bch" + item.ItemCode.Replace("itmcat", "") + "001";

                if (await _context.ItemBatches.AnyAsync(x => x.ItemId == request.ItemId))
                {
                    itemBatchCode = "bch" + item.ItemCode.Replace("itmcat", "") + (_context.ItemBatches.AsEnumerable().Where(x => x.ItemBatchCode.Substring(0, x.ItemBatchCode.Length - 3) == "bch" + item.ItemCode.Replace("itmcat", ""))
                        .Max(x => Convert.ToInt32(x.ItemBatchCode.Substring(x.ItemBatchCode.Length - 3, 3))) + 1).ToString("D3");
                }
                itemBatch.ItemBatchCode = itemBatchCode;

                await _context.ItemBatches.AddAsync(itemBatch);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}