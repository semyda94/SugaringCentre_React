using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
            public string DisplayName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> {
            public CommandValidator() {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                this._userManager = userManager;
                this._jwtGenerator = jwtGenerator;
                this._context = context;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.DisplayName).NotEmpty();
                    RuleFor(x => x.Username).NotEmpty();
                    RuleFor(x => x.Email).NotEmpty().EmailAddress();
                    RuleFor(x => x.Password).Password();
                }
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.AnyAsync(x => x.Email ==request.Email)) {
                    throw new RestException(HttpStatusCode.BadRequest);
                }

                if (await _context.Users.AnyAsync(x => x.UserName == request.Username)) {
                    throw new RestException(HttpStatusCode.BadRequest);
                }

                var user = new AppUser
                {
                    UserName = request.Username,
                    Email = request.Email,
                    DisplayName = request.DisplayName   
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                    return Unit.Value;

                throw new Exception("Error during creating user");
            }
        }
    }
}