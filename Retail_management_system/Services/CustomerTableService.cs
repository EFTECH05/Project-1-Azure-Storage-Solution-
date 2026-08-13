using Azure.Data.Tables;
using Retail_management_system.Models;

namespace Retail_management_system.Services
{
    public class CustomerTableService
    {
        private readonly TableClient _tableClient;

        public CustomerTableService(IConfiguration configuration)
        {
            string connectionString =
                configuration["AzureStorage:ConnectionString"]
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured.");

            _tableClient = new TableClient(
                connectionString,
                "Customers");

            _tableClient.CreateIfNotExists();
        }

        // Get all customers
        public async Task<List<Customer>> GetCustomersAsync()
        {
            var customers = new List<Customer>();

            await foreach (Customer customer in _tableClient.QueryAsync<Customer>())
            {
                customers.Add(customer);
            }

            return customers;
        }

        // Add a customer
        public async Task AddCustomerAsync(Customer customer)
        {
            customer.PartitionKey = "Customers";

            if (string.IsNullOrEmpty(customer.RowKey))
            {
                customer.RowKey = Guid.NewGuid().ToString();
            }

            await _tableClient.AddEntityAsync(customer);
        }

        // Delete a customer
        public async Task DeleteCustomerAsync(
            string partitionKey,
            string rowKey)
        {
            await _tableClient.DeleteEntityAsync(
                partitionKey,
                rowKey);
        }
    }
}
