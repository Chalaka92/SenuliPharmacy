using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Statuses
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int StatusTypeId { get; set; }
            public string Name { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.StatusTypeId).GreaterThan(0);
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
                var status = await _context.Statuses.FindAsync(request.Id);

                if (status == null)
                    throw new RestException(HttpStatusCode.NotFound, new { status = "Not Found" });

                status.Name = request.Name ?? status.Name;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}