using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int CategoryId { get; set; }
            public string Name { get; set; }
            public string ItemCode { get; set; }
            public string Comment { get; set; }
            public bool IsNew { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.CategoryId).GreaterThan(0);
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
                var item = await _context.Items.FindAsync(request.Id);

                if (item == null)
                    throw new RestException(HttpStatusCode.NotFound, new { item = "Not Found" });

                item.Name = request.Name ?? item.Name;
                item.Comment = request.Comment ?? item.Comment;
                item.IsNew = request.IsNew;
                item.CategoryId = request.CategoryId == 0 ? item.CategoryId : request.CategoryId;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}