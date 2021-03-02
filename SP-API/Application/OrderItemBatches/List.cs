using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.OrderItemBatches
{
    public class List
    {
        public class Query : IRequest<List<OrderItemBatchDto>> { }

        public class Handler : IRequestHandler<Query, List<OrderItemBatchDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<OrderItemBatchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orderItemBatches = await _context.OrderItemBatches.ToListAsync();
                var returnOrderItemBatches = _mapper.Map<List<OrderItemBatch>, List<OrderItemBatchDto>>(orderItemBatches);
                returnOrderItemBatches.ForEach(async x =>
                {
                    x.ItemBatchCode = (await _context.ItemBatches.FindAsync(x.ItemBatchId)).ItemBatchCode;
                    x.OrderedDate = (await _context.Orders.FindAsync(x.OrderId)).OrderedDate;
                });

                return returnOrderItemBatches;
            }
        }

    }
}