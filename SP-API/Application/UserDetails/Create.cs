using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.User;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserDetails
{
    public class Create
    {
        public class Command : IRequest
        {
            public string LoginEmail { get; set; }
            public int Id { get; set; }
            public int RoleId { get; set; }
            public string UserCode { get; set; }
            public string FirstName { get; set; }
            public string MiddleName { get; set; }
            public string LastName { get; set; }
            public DateTime Birthday { get; set; }
            public string NIC { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedBy { get; set; }
            public virtual ICollection<UserAddress> UserAddresses { get; set; }
            public virtual ICollection<UserEmail> UserEmails { get; set; }
            public virtual ICollection<UserContact> UserContacts { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.LoginEmail).NotEmpty();
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.NIC).NotEmpty();
                RuleFor(x => x.Birthday).NotEmpty();
                RuleFor(x => x.RoleId).GreaterThan(0);
                RuleFor(x => x.UserAddresses).NotNull();
                RuleFor(x => x.UserEmails).NotNull();
                RuleFor(x => x.UserContacts).NotNull();
            }
        }

        public class Handler : IRequestHandler<Command>
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

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.UserDetails.Where(x => x.NIC == request.NIC.Trim()).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "User already exists (NIC)." });

                var userDetail = _mapper.Map<Command, UserDetail>(request);

                var userCode = "usr" + request.FirstName[0].ToString().ToLower() + request.LastName[0].ToString().ToLower() + request.RoleId + "0001";

                if (_context.UserDetails.Any())
                {
                    userCode = "usr" + request.FirstName[0].ToString().ToLower() + request.LastName[0].ToString().ToLower() + request.RoleId +
                     (_context.UserDetails.AsEnumerable()
                                          .Max(x => Convert.ToInt32(x.UserCode.Substring(x.UserCode.Length - 4, 4))) + 1).ToString("D4");
                }
                userDetail.UserCode = userCode;

                var loginUser = await _userManager.FindByEmailAsync(request.LoginEmail);
                userDetail.CreatedBy = loginUser.Id;

                var user = await _context.UserDetails.AddAsync(userDetail);

                //Address
                userDetail.UserAddresses.ToList().ForEach(async x =>
                {
                    x.UserId = userDetail.Id;
                    await _context.UserAddresses.AddAsync(x);
                });

                //Email
                userDetail.UserEmails.ToList().ForEach(async x =>
                {
                    x.UserId = userDetail.Id;
                    await _context.UserEmails.AddAsync(x);
                });

                //Contact
                userDetail.UserContacts.ToList().ForEach(async x =>
                {
                    x.UserId = userDetail.Id;
                    await _context.UserContacts.AddAsync(x);
                });

                // //Add to Sales Rep
                // if (((AccountRole)request.RoleId).ToString() == "SalesRep")
                // {
                //     var salesRep = new SalesRep
                //     {
                //         UserId = userDetail.Id,
                //         SalesRepCode = "sr" + userDetail.UserCode,

                //     };
                //     await _context.SalesReps.AddAsync(salesRep);
                // }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}