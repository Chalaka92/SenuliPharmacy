using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.ItemBatches
{
    public class Details
    {
        public class Query : IRequest<ItemBatchDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ItemBatchDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<ItemBatchDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var itemBatch = await _context.ItemBatches.FindAsync(request.Id);

                if (itemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { itemBatch = "Not Found" });

                var returnItemBatch = _mapper.Map<ItemBatch, ItemBatchDto>(itemBatch);

                return returnItemBatch;
            }
        }
    }
}