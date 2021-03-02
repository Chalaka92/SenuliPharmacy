using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PaymentTypes
{
    public class List
    {
        public class Query : IRequest<List<PaymentType>> { }

        public class Handler : IRequestHandler<Query, List<PaymentType>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<PaymentType>> Handle(Query request, CancellationToken cancellationToken)
            {
                var paymentTypes = await _context.PaymentTypes.ToListAsync();
                return paymentTypes;
            }
        }

    }
}