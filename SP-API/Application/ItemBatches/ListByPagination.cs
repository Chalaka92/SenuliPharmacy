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
    public class ListByPagination
    {
        public class ItemBatchEnvelope
        {
            public List<ItemBatchDto> ItemBatches { get; set; }
            public int RecordCount { get; set; }
        }
        public class Query : IRequest<ItemBatchEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }

            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, ItemBatchEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ItemBatchEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.ItemBatches.AsQueryable();
                var itemBatches = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? queryable.Count()).ToListAsync();
                var returnItemBatches = _mapper.Map<List<ItemBatch>, List<ItemBatchDto>>(itemBatches);
                if (returnItemBatches == null)
                    return null;

                returnItemBatches.ForEach(async x =>
                {
                    var item = await _context.Items.FindAsync(x.ItemId);
                    var status = await _context.Statuses.FindAsync(x.ItemStatusId);
                    x.ItemName = item.Name;
                    x.ItemStatusName = status.Name;
                });

                return new ItemBatchEnvelope
                {
                    ItemBatches = returnItemBatches,
                    RecordCount = queryable.Count()
                };
            }
        }

    }
}