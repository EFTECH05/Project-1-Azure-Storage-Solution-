using Azure.Data.Tables;
using Retail_management_system.Models;

namespace Retail_management_system.Services
{
    public class ProductTableService
    {
        private readonly TableClient _tableClient;

        public ProductTableService(IConfiguration configuration)
        {
            string connectionString =
                configuration["AzureStorage:ConnectionString"]
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured.");

            _tableClient = new TableClient(
                connectionString,
                "Products");

            _tableClient.CreateIfNotExists();
        }

        // Get all products
        public async Task<List<Product>> GetProductsAsync()
        {
            var products = new List<Product>();

            await foreach (Product product in _tableClient.QueryAsync<Product>())
            {
                products.Add(product);
            }

            return products;
        }

        // Add a product
        public async Task AddProductAsync(Product product)
        {
            product.PartitionKey = "Products";

            if (string.IsNullOrEmpty(product.RowKey))
            {
                product.RowKey = Guid.NewGuid().ToString();
            }

            await _tableClient.AddEntityAsync(product);
        }

        // Delete a product
        public async Task DeleteProductAsync(
            string partitionKey,
            string rowKey)
        {
            await _tableClient.DeleteEntityAsync(
                partitionKey,
                rowKey);
        }
    }
}