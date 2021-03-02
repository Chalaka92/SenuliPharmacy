using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ReturnTypes
{
    public class List
    {
        public class Query : IRequest<List<ReturnType>> { }

        public class Handler : IRequestHandler<Query, List<ReturnType>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ReturnType>> Handle(Query request, CancellationToken cancellationToken)
            {
                var returnTypes = await _context.ReturnTypes.ToListAsync();
                return returnTypes;
            }
        }

    }
}