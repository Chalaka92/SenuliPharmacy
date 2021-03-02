using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ItemBatches
{
    public class ListByItemId
    {
        public class Query : IRequest<List<ItemBatchDto>>
        {
            public int ItemId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<ItemBatchDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ItemBatchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var itemBatches = await _context.ItemBatches.Where(x => x.ItemId == request.ItemId).ToListAsync();

                var returnItemBatches = _mapper.Map<List<ItemBatch>, List<ItemBatchDto>>(itemBatches);

                return returnItemBatches;
            }
        }

    }
}