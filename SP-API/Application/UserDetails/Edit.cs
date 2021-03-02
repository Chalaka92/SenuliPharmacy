using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.User;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserDetails
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int RoleId { get; set; }
            public string UserCode { get; set; }
            public string FirstName { get; set; }
            public string MiddleName { get; set; }
            public string LastName { get; set; }
            public DateTime Birthday { get; set; }
            public string NIC { get; set; }
            public virtual ICollection<UserAddress> UserAddresses { get; set; }
            public virtual ICollection<UserEmail> UserEmails { get; set; }
            public virtual ICollection<UserContact> UserContacts { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.NIC).NotEmpty();
                RuleFor(x => x.Birthday).NotEmpty();
                RuleFor(x => x.RoleId).GreaterThan(0);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var userDetail = await _context.UserDetails.FindAsync(request.Id);

                if (userDetail == null)
                    throw new RestException(HttpStatusCode.NotFound, new { userDetail = "Not Found" });

                userDetail.FirstName = request.FirstName ?? userDetail.FirstName;
                userDetail.MiddleName = request.MiddleName ?? userDetail.MiddleName;
                userDetail.LastName = request.LastName ?? userDetail.LastName;
                userDetail.NIC = request.NIC ?? userDetail.NIC;
                userDetail.Birthday = request.Birthday;
                userDetail.RoleId = request.RoleId;

                _context.UserAddresses.RemoveRange(_context.UserAddresses.Where(x => x.UserId == userDetail.Id));
                _context.UserEmails.RemoveRange(_context.UserEmails.Where(x => x.UserId == userDetail.Id));
                _context.UserContacts.RemoveRange(_context.UserContacts.Where(x => x.UserId == userDetail.Id));

                //Address
                request.UserAddresses.ToList().ForEach(async x =>
                {
                    x.UserId = userDetail.Id;
                    await _context.UserAddresses.AddAsync(x);
                });

                //Email
                request.UserEmails.ToList().ForEach(async x =>
                {
                    x.UserId = userDetail.Id;
                    await _context.UserEmails.AddAsync(x);
                });

                //Contact
                request.UserContacts.ToList().ForEach(async x =>
                {
                    x.UserId = userDetail.Id;
                    await _context.UserContacts.AddAsync(x);
                });

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}