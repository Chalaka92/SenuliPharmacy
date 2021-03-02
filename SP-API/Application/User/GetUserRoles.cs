using Application.Errors;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class GetUserRoles
    {
        public class Query : IRequest<List<UserRole>> { }

        public class Handler : IRequestHandler<Query, List<UserRole>>
        {
            private readonly RoleManager<IdentityRole> _roleManager;
            private readonly DataContext _context;
            public Handler(DataContext context, RoleManager<IdentityRole> roleManager)
            {
                _context = context;
                _roleManager = roleManager;
            }

            public async Task<List<UserRole>> Handle(Query request, CancellationToken cancellationToken)
            {
                var roles = await _roleManager.Roles.ToListAsync();

                if (roles == null)
                    throw new RestException(HttpStatusCode.NotFound, new { roles = "Not Found" });

                var returnRoles = new List<UserRole>();
                roles.ForEach(x =>
                {
                    var role = new UserRole
                    {
                        Id = (int)Enum.Parse(typeof(AccountRole), x.Name),
                        Name = x.Name
                    };
                    returnRoles.Add(role);
                });

                return returnRoles;
            }

        }
    }
}