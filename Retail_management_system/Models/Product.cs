using Azure;
using Azure.Data.Tables;

namespace Retail_management_system.Models
{
    public class Product : ITableEntity
    {
        public string PartitionKey { get; set; } = "Products";

        public string RowKey { get; set; } = Guid.NewGuid().ToString();

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Category { get; set; } = string.Empty;

        public int StockQuantity { get; set; }

        // Stores the URL of the image in Azure Blob Storage
        public string ImageUrl { get; set; } = string.Empty;

        public DateTimeOffset? Timestamp { get; set; }

        public ETag ETag { get; set; }
    }
}