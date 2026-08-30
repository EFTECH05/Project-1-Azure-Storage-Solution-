using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Retail_management_system.Models;
using Retail_management_system.Services;

namespace Retail_management_system.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly CustomerAccountTableService
            _customerAccountTableService;

        private readonly PasswordHasher<CustomerAccount>
            _passwordHasher;

        public AuthController(
            CustomerAccountTableService customerAccountTableService)
        {
            _customerAccountTableService =
                customerAccountTableService;

            _passwordHasher =
                new PasswordHasher<CustomerAccount>();
        }

        // =====================================================
        // REGISTER
        // =====================================================

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            [FromBody] RegisterRequest request)
        {
            if (request == null)
            {
                return BadRequest(new
                {
                    message = "Registration data is required."
                });
            }

            if (string.IsNullOrWhiteSpace(request.Name) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message =
                        "Name, email and password are required."
                });
            }

            string email =
                request.Email.Trim().ToLowerInvariant();

            CustomerAccount? existingAccount =
                await _customerAccountTableService
                    .GetByEmailAsync(email);

            if (existingAccount != null)
            {
                return Conflict(new
                {
                    message =
                        "An account with this email already exists."
                });
            }

            CustomerAccount account =
                new CustomerAccount
                {
                    Name = request.Name.Trim(),

                    Email = email,

                    Phone =
                        request.Phone?.Trim()
                        ?? string.Empty,

                    Address =
                        request.Address?.Trim()
                        ?? string.Empty
                };

            account.PasswordHash =
                _passwordHasher.HashPassword(
                    account,
                    request.Password
                );

            await _customerAccountTableService
                .AddAccountAsync(account);

            return Ok(new
            {
                message =
                    "Account created successfully.",

                customerId =
                    account.RowKey,

                name =
                    account.Name,

                email =
                    account.Email
            });
        }

        // =====================================================
        // LOGIN
        // =====================================================

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginRequest request)
        {
            if (request == null)
            {
                return BadRequest(new
                {
                    message = "Login data is required."
                });
            }

            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message =
                        "Email and password are required."
                });
            }

            string email =
                request.Email.Trim().ToLowerInvariant();

            CustomerAccount? account =
                await _customerAccountTableService
                    .GetByEmailAsync(email);

            if (account == null)
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid email or password."
                });
            }

            PasswordVerificationResult result =
                _passwordHasher.VerifyHashedPassword(
                    account,
                    account.PasswordHash,
                    request.Password
                );

            if (result ==
                PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid email or password."
                });
            }

            return Ok(new
            {
                message =
                    "Login successful.",

                customerId =
                    account.RowKey,

                name =
                    account.Name,

                email =
                    account.Email
            });
        }
    }
}