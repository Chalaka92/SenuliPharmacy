using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Details
    {
        public class Query : IRequest<ItemDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ItemDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<ItemDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.Id);

                if (item == null)
                    throw new RestException(HttpStatusCode.NotFound, new { item = "Not Found" });

                var returnItem = _mapper.Map<Item, ItemDto>(item);

                return returnItem;
            }
        }
    }
}