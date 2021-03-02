using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ItemCategories
{
    public class List
    {
        public class Query : IRequest<List<ItemCategory>> { }

        public class Handler : IRequestHandler<Query, List<ItemCategory>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ItemCategory>> Handle(Query request, CancellationToken cancellationToken)
            {
                var itemCategories = await _context.ItemCategories.ToListAsync();
                return itemCategories;
            }
        }

    }
}