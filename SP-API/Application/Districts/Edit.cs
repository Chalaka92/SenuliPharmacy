using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Districts
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int ProvinceId { get; set; }
            public string Name { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
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
                var district = await _context.Districts.FindAsync(request.Id);

                if (district == null)
                    throw new RestException(HttpStatusCode.NotFound, new { district = "Not Found" });

                district.Name = request.Name ?? district.Name;
                district.ProvinceId = request.ProvinceId;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}