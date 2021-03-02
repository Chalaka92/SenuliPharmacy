using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.StatusTypes
{
    public class Details
    {
        public class Query : IRequest<StatusType>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, StatusType>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<StatusType> Handle(Query request, CancellationToken cancellationToken)
            {
                var statusType = await _context.StatusTypes.FindAsync(request.Id);

                if (statusType == null)
                    throw new RestException(HttpStatusCode.NotFound, new { statusType = "Not Found" });

                return statusType;
            }
        }
    }
}