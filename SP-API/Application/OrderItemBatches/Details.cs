using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.OrderItemBatches
{
    public class Details
    {
        public class Query : IRequest<OrderItemBatchDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, OrderItemBatchDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<OrderItemBatchDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var orderItemBatch = await _context.OrderItemBatches.FindAsync(request.Id);

                if (orderItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { orderItemBatch = "Not Found" });

                var returnOrderItemBatch = _mapper.Map<OrderItemBatch, OrderItemBatchDto>(orderItemBatch);

                return returnOrderItemBatch;
            }
        }
    }
}