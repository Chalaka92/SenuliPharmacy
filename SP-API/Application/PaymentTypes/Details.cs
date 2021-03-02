using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.PaymentTypes
{
    public class Details
    {
        public class Query : IRequest<PaymentType>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, PaymentType>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<PaymentType> Handle(Query request, CancellationToken cancellationToken)
            {
                var paymentType = await _context.PaymentTypes.FindAsync(request.Id);

                if (paymentType == null)
                    throw new RestException(HttpStatusCode.NotFound, new { paymentType = "Not Found" });

                return paymentType;
            }
        }
    }
}