using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Statuses
{
    public class List
    {
        public class Query : IRequest<List<StatusDto>> { }

        public class Handler : IRequestHandler<Query, List<StatusDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<StatusDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var statuses = await _context.Statuses.ToListAsync();
                var returnStatuses = _mapper.Map<List<Status>, List<StatusDto>>(statuses);
                if (returnStatuses == null)
                    return null;

                returnStatuses.ForEach(async x =>
                {
                    x.StatusTypeName = (await _context.StatusTypes.FindAsync(x.StatusTypeId)).Name;
                });
                return returnStatuses;
            }
        }

    }
}