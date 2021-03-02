using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.StatusTypes
{
    public class List
    {
        public class Query : IRequest<List<StatusType>> { }

        public class Handler : IRequestHandler<Query, List<StatusType>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<StatusType>> Handle(Query request, CancellationToken cancellationToken)
            {
                var statusTypes = await _context.StatusTypes.ToListAsync();
                return statusTypes;
            }
        }

    }
}