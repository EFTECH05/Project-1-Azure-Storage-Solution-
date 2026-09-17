

using Azure.Storage.Queues;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace RetailmanagementFunctions
{
    public class StoreOrderFunction
    {
        private readonly ILogger<StoreOrderFunction> _logger;
        private readonly QueueClient _queueClient;

        public StoreOrderFunction(ILogger<StoreOrderFunction> logger)
        {
            _logger = logger;

            string connectionString =
                Environment.GetEnvironmentVariable("AzureStorageConnection")
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured."
                );

            _queueClient = new QueueClient(
                connectionString,
                "orders"
            );

            _queueClient.CreateIfNotExists();
        }

        [Function("StoreOrderFunction")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            _logger.LogInformation("StoreOrderFunction started.");

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

                var order =
                    JsonSerializer.Deserialize<OrderRequest>(
                        requestBody,
                        new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        }
                    );

                if (order == null)
                {
                    return new BadRequestObjectResult(
                        "Invalid order data."
                    );
                }

                if (string.IsNullOrWhiteSpace(order.CustomerId))
                {
                    return new BadRequestObjectResult(
                        "CustomerId is required."
                    );
                }

                if (string.IsNullOrWhiteSpace(order.ProductId))
                {
                    return new BadRequestObjectResult(
                        "ProductId is required."
                    );
                }

                if (order.Quantity <= 0)
                {
                    return new BadRequestObjectResult(
                        "Quantity must be greater than zero."
                    );
                }

                if (order.Total < 0)
                {
                    return new BadRequestObjectResult(
                        "Total cannot be negative."
                    );
                }

                string orderId = Guid.NewGuid().ToString();

                var orderMessage = new
                {
                    orderId = orderId,
                    customerId = order.CustomerId,
                    productId = order.ProductId,
                    quantity = order.Quantity,
                    total = order.Total,
                    orderDate = DateTime.UtcNow
                };

                string message =
                    JsonSerializer.Serialize(orderMessage);

                await _queueClient.SendMessageAsync(message);

                _logger.LogInformation(
                    "Order {OrderId} was successfully added to the orders queue.",
                    orderId
                );

                return new OkObjectResult(
                    new
                    {
                        message =
                            "Order added successfully to Azure Queue Storage.",

                        orderId = orderId,

                        queue = "orders",

                        order = orderMessage
                    }
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error adding order to Azure Queue Storage."
                );

                return new ObjectResult(
                    "An error occurred while adding the order."
                )
                {
                    StatusCode = 500
                };
            }
        }
    }

    public class OrderRequest
    {
        public string CustomerId { get; set; } = string.Empty;

        public string ProductId { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public decimal Total { get; set; }
    }
}

