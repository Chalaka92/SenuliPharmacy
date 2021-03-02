using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Provinces
{
    public class List
    {
        public class Query : IRequest<List<Province>> { }

        public class Handler : IRequestHandler<Query, List<Province>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Province>> Handle(Query request, CancellationToken cancellationToken)
            {
                var provinces = await _context.Provinces.ToListAsync();
                return provinces;
            }
        }

    }
}