using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class List
    {
        public class Query : IRequest<List<ItemDto>> { }

        public class Handler : IRequestHandler<Query, List<ItemDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ItemDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var items = await _context.Items.ToListAsync();
                var returnItems = _mapper.Map<List<Item>, List<ItemDto>>(items);
                if (returnItems == null)
                    return null;

                returnItems.ForEach(async x =>
                {
                    var itemCategory = await _context.ItemCategories.FindAsync(x.CategoryId);
                    x.CategoryName = itemCategory.Name;
                });
                return returnItems;
            }
        }

    }
}