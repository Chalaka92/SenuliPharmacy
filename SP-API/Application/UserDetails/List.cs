using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.User;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserDetails
{
    public class List
    {
        public class Query : IRequest<List<UserDetailDto>> { }

        public class Handler : IRequestHandler<Query, List<UserDetailDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<UserDetailDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userDetails = await _context.UserDetails.ToListAsync();
                var returnUserDetails = _mapper.Map<List<UserDetail>, List<UserDetailDto>>(userDetails);
                if (returnUserDetails == null)
                    return null;

                returnUserDetails.ForEach(async x =>
                {
                    x.RoleName = ((AccountRole)x.RoleId).ToString();
                    var createUserDetails = await _userManager.FindByIdAsync(x.CreatedBy);
                    x.CreatedBy = createUserDetails.DisplayName;

                    var firstAddress = x.UserAddresses.FirstOrDefault();
                    if (firstAddress != null)
                    {
                        var district = await _context.Districts.FindAsync(firstAddress.DistrictId);
                        var province = await _context.Provinces.FindAsync(firstAddress.ProvinceId);
                        string[] displayAddress = { firstAddress.Address1, firstAddress.Address2, firstAddress.Address3, district.Name, province.Name };

                        x.DisplayAddress = string.Join(",", displayAddress.Where(e => !string.IsNullOrWhiteSpace(e)));
                    }
                });
                return returnUserDetails;
            }
        }

    }
}