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
    public class List
    {
        public class Query : IRequest<List<DistrictDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<DistrictDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<DistrictDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var districts = await _context.Districts.ToListAsync();
                var returnDistricts = _mapper.Map<List<District>, List<DistrictDto>>(districts);
                if (returnDistricts == null)
                    return null;

                returnDistricts.ForEach(async x =>
                {
                    x.ProvinceName = (await _context.Provinces.FindAsync(x.ProvinceId)).Name;
                });

                return returnDistricts;
            }
        }

    }
}