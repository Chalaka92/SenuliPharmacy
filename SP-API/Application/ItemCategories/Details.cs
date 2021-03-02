using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.ItemCategories
{
    public class Details
    {
        public class Query : IRequest<ItemCategory>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ItemCategory>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<ItemCategory> Handle(Query request, CancellationToken cancellationToken)
            {
                var itemCategory = await _context.ItemCategories.FindAsync(request.Id);

                if (itemCategory == null)
                    throw new RestException(HttpStatusCode.NotFound, new { itemCategory = "Not Found" });

                return itemCategory;
            }
        }
    }
}