
using Azure.Data.Tables;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace RetailmanagementFunctions
{
    public class StoreProductFunction
    {
        private readonly ILogger<StoreProductFunction> _logger;
        private readonly TableClient _tableClient;

        public StoreProductFunction(
            ILogger<StoreProductFunction> logger)
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
                "Products"
            );

            _tableClient.CreateIfNotExists();
        }

        [Function("StoreProductFunction")]
        public async Task<IActionResult> Run(
            [HttpTrigger(
                AuthorizationLevel.Function,
                "post"
            )] HttpRequest req)
        {
            _logger.LogInformation(
                "StoreProductFunction started."
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

                var product =
                    JsonSerializer.Deserialize<ProductRequest>(
                        requestBody,
                        new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        }
                    );

                if (product == null)
                {
                    return new BadRequestObjectResult(
                        "Invalid product data."
                    );
                }

                if (string.IsNullOrWhiteSpace(product.Name))
                {
                    return new BadRequestObjectResult(
                        "Product name is required."
                    );
                }

                if (product.Price < 0)
                {
                    return new BadRequestObjectResult(
                        "Product price cannot be negative."
                    );
                }

                if (product.StockQuantity < 0)
                {
                    return new BadRequestObjectResult(
                        "Stock quantity cannot be negative."
                    );
                }

                var entity = new TableEntity
                {
                    PartitionKey = "Products",
                    RowKey = Guid.NewGuid().ToString(),

                    ["Name"] = product.Name,
                    ["Description"] = product.Description,
                    ["Price"] = product.Price,
                    ["Category"] = product.Category,
                    ["StockQuantity"] = product.StockQuantity,
                    ["ImageUrl"] = product.ImageUrl
                };

                await _tableClient.AddEntityAsync(entity);

                _logger.LogInformation(
                    "Product {Name} was stored successfully in the Products table.",
                    product.Name
                );

                return new OkObjectResult(
                    new
                    {
                        message =
                            "Product stored successfully in Azure Table Storage.",

                        partitionKey =
                            entity.PartitionKey,

                        rowKey =
                            entity.RowKey,

                        product = new
                        {
                            name = product.Name,
                            description = product.Description,
                            price = product.Price,
                            category = product.Category,
                            stockQuantity = product.StockQuantity,
                            imageUrl = product.ImageUrl
                        }
                    }
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error storing product in Azure Table Storage."
                );

                return new ObjectResult(
                    "An error occurred while storing the product."
                )
                {
                    StatusCode = 500
                };
            }
        }
    }

    public class ProductRequest
    {
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Category { get; set; } = string.Empty;

        public int StockQuantity { get; set; }

        public string ImageUrl { get; set; } = string.Empty;
    }
}

