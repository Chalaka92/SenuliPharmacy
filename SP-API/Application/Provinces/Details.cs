using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Provinces
{
    public class Details
    {
        public class Query : IRequest<Province>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Province>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Province> Handle(Query request, CancellationToken cancellationToken)
            {
                var province = await _context.Provinces.FindAsync(request.Id);

                if (province == null)
                    throw new RestException(HttpStatusCode.NotFound, new { province = "Not Found" });

                return province;
            }
        }
    }
}