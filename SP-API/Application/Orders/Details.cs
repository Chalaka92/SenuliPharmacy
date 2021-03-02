using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Orders
{
    public class Details
    {
        public class Query : IRequest<OrderDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, OrderDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<OrderDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.FindAsync(request.Id);

                if (order == null)
                    throw new RestException(HttpStatusCode.NotFound, new { order = "Not Found" });

                var returnOrder = _mapper.Map<Order, OrderDto>(order);
                returnOrder.OrderItemBatches.ToList().ForEach(async x =>
                {
                    x.ItemBatchCode = (await _context.ItemBatches.FindAsync(x.ItemBatchId)).ItemBatchCode;
                });

                return returnOrder;
            }
        }
    }
}