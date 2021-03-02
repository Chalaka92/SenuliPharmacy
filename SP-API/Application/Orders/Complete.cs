using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders
{
    public class Complete
    {
        public class Command : IRequest
        {
            public string LoginEmail { get; set; }
            public int Id { get; set; }
            public bool IsComplete { get; set; }
            public DateTime? CompletedDate { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.LoginEmail).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = await _context.Orders.FindAsync(request.Id);

                if (order == null)
                    throw new RestException(HttpStatusCode.NotFound, new { order = "Not Found" });

                var loggedUser = await _userManager.FindByEmailAsync(request.LoginEmail);
                var userDetail = await _context.UserDetails.FirstOrDefaultAsync((x => x.LoggedUserId == loggedUser.Id));

                order.IsComplete = request.IsComplete;
                order.CompletedDate = request.CompletedDate;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}