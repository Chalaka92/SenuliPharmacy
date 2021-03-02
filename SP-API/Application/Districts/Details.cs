using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Districts
{
    public class Details
    {
        public class Query : IRequest<DistrictDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, DistrictDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<DistrictDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var district = await _context.Districts.FindAsync(request.Id);

                if (district == null)
                    throw new RestException(HttpStatusCode.NotFound, new { district = "Not Found" });

                var returnDistrict = _mapper.Map<District, DistrictDto>(district);

                return returnDistrict;
            }
        }
    }
}