using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.ReturnTypes
{
    public class Details
    {
        public class Query : IRequest<ReturnType>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ReturnType>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<ReturnType> Handle(Query request, CancellationToken cancellationToken)
            {
                var returnType = await _context.ReturnTypes.FindAsync(request.Id);

                if (returnType == null)
                    throw new RestException(HttpStatusCode.NotFound, new { returnType = "Not Found" });

                return returnType;
            }
        }
    }
}