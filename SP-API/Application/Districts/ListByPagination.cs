using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Districts
{
    public class ListByPagination
    {
        public class DistrictEnvelope
        {
            public List<DistrictDto> Districts { get; set; }
            public int RecordCount { get; set; }
        }
        public class Query : IRequest<DistrictEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }

            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, DistrictEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<DistrictEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Districts.AsQueryable();
                var districts = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? queryable.Count()).ToListAsync();
                var returnDistricts = _mapper.Map<List<District>, List<DistrictDto>>(districts);
                if (returnDistricts == null)
                    return null;

                returnDistricts.ForEach(async x =>
                {
                    x.ProvinceName = (await _context.Provinces.FindAsync(x.ProvinceId)).Name;
                });
                return new DistrictEnvelope
                {
                    Districts = returnDistricts,
                    RecordCount = queryable.Count()
                };
            }
        }

    }
}