
using Azure.Data.Tables;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace RetailmanagementFunctions
{
    public class StoreCustomerFunction
    {
        private readonly ILogger<StoreCustomerFunction> _logger;
        private readonly TableClient _tableClient;

        public StoreCustomerFunction(
            ILogger<StoreCustomerFunction> logger)
        {
            _logger = logger;

            string connectionString =
                Environment.GetEnvironmentVariable(
                    "AzureStorageConnection"
                )
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured."
                );

            _tableClient = new TableClient(
                connectionString,
                "Customers"
            );

            _tableClient.CreateIfNotExists();
        }

        [Function("StoreCustomerFunction")]
        public async Task<IActionResult> Run(
            [HttpTrigger(
                AuthorizationLevel.Function,
                "post"
            )] HttpRequest req)
        {
            _logger.LogInformation(
                "StoreCustomerFunction started."
            );

            try
            {
                string requestBody =
                    await new StreamReader(req.Body)
                        .ReadToEndAsync();

                if (string.IsNullOrWhiteSpace(requestBody))
                {
                    return new BadRequestObjectResult(
                        "Request body cannot be empty."
                    );
                }

                var customer =
                    JsonSerializer.Deserialize<CustomerRequest>(
                        requestBody,
                        new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        }
                    );

                if (customer == null)
                {
                    return new BadRequestObjectResult(
                        "Invalid customer data."
                    );
                }

                if (string.IsNullOrWhiteSpace(customer.Name))
                {
                    return new BadRequestObjectResult(
                        "Customer name is required."
                    );
                }

                if (string.IsNullOrWhiteSpace(customer.Email))
                {
                    return new BadRequestObjectResult(
                        "Customer email is required."
                    );
                }

                var entity = new TableEntity
                {
                    PartitionKey = "Customers",
                    RowKey = Guid.NewGuid().ToString(),

                    ["Name"] = customer.Name,
                    ["Email"] = customer.Email,
                    ["Phone"] = customer.Phone,
                    ["Address"] = customer.Address
                };

                await _tableClient.AddEntityAsync(entity);

                _logger.LogInformation(
                    "Customer {Name} was stored successfully in the Customers table.",
                    customer.Name
                );

                return new OkObjectResult(
                    new
                    {
                        message =
                            "Customer stored successfully in Azure Table Storage.",

                        partitionKey =
                            entity.PartitionKey,

                        rowKey =
                            entity.RowKey,

                        customer = new
                        {
                            name = customer.Name,
                            email = customer.Email,
                            phone = customer.Phone,
                            address = customer.Address
                        }
                    }
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error storing customer in Azure Table Storage."
                );

                return new ObjectResult(
                    "An error occurred while storing the customer."
                )
                {
                    StatusCode = 500
                };
            }
        }
    }

    public class CustomerRequest
    {
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;
    }
}

