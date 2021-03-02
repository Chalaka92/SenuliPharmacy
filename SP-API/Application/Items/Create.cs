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

namespace Application.Items
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int CategoryId { get; set; }
            public string Name { get; set; }
            public string ItemCode { get; set; }
            public string Comment { get; set; }
            public bool IsNew { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.CategoryId).GreaterThan(0);
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
                var item = _mapper.Map<Command, Item>(request);
                var itemCategory = await _context.ItemCategories.FindAsync(request.CategoryId);

                var itemCode = "itm" + itemCategory.ItemCategoryCode + "001";

                if (await _context.Items.AnyAsync(x => x.CategoryId == request.CategoryId))
                {
                    itemCode = "itm" + itemCategory.ItemCategoryCode +
                     (_context.Items.AsEnumerable().Where(x => x.ItemCode.Substring(0, x.ItemCode.Length - 3) == "itm" + itemCategory.ItemCategoryCode)
                                    .Max(x => Convert.ToInt32(x.ItemCode.Substring(x.ItemCode.Length - 3, 3))) + 1).ToString("D3");
                }
                item.ItemCode = itemCode;

                await _context.Items.AddAsync(item);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}