using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class List
    {
        public class Query : IRequest<List<OrderDto>> { }

        public class Handler : IRequestHandler<Query, List<OrderDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<OrderDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = await _context.Orders.ToListAsync();
                var returnOrders = _mapper.Map<List<Order>, List<OrderDto>>(orders);
                if (returnOrders == null)
                    return null;

                returnOrders.ForEach(async x =>
                {
                    var user = await _context.UserDetails.FindAsync(x.UserId);
                    var editUser = await _context.UserDetails.FindAsync(x.EditedUserId);
                    var cancelUser = await _context.UserDetails.FindAsync(x.CanceledUserId);
                    x.SalesRepName = user.FirstName + ' ' + user.LastName;
                    if (cancelUser != null)
                    {
                        x.CanceledUserName = cancelUser.FirstName;
                    }
                    if (editUser != null)
                    {
                        x.EditedUserName = editUser.FirstName;
                    }
                });
                return returnOrders;
            }
        }

    }
}