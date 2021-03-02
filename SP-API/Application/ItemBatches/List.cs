using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ItemBatches
{
    public class List
    {
        public class Query : IRequest<List<ItemBatchDto>> { }

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
                var itemBatches = await _context.ItemBatches.ToListAsync();
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
                return returnItemBatches;
            }
        }

    }
}