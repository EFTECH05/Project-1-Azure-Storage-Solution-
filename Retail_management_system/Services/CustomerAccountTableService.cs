using Azure.Data.Tables;
using Retail_management_system.Models;

namespace Retail_management_system.Services
{
    public class CustomerAccountTableService
    {
        private readonly TableClient _tableClient;

        public CustomerAccountTableService(
            IConfiguration configuration)
        {
            string connectionString =
                configuration["AzureStorage:ConnectionString"]
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured."
                );

            _tableClient = new TableClient(
                connectionString,
                "CustomerAccounts"
            );

            // Creates CustomerAccounts automatically
            // if it does not already exist.
            _tableClient.CreateIfNotExists();
        }

        public async Task AddAccountAsync(
            CustomerAccount account)
        {
            await _tableClient.AddEntityAsync(account);
        }

        public async Task<CustomerAccount?> GetByEmailAsync(
            string email)
        {
            string normalizedEmail =
                email.Trim().ToLowerInvariant();

            await foreach (
                CustomerAccount account
                in _tableClient.QueryAsync<CustomerAccount>(
                    customer =>
                        customer.PartitionKey ==
                            "CustomerAccounts"
                        &&
                        customer.Email ==
                            normalizedEmail
                ))
            {
                return account;
            }

            return null;
        }

        public async Task<CustomerAccount?> GetByIdAsync(
            string rowKey)
        {
            try
            {
                var response =
                    await _tableClient.GetEntityAsync<CustomerAccount>(
                        "CustomerAccounts",
                        rowKey
                    );

                return response.Value;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<CustomerAccount>>
            GetAccountsAsync()
        {
            List<CustomerAccount> accounts = new();

            await foreach (
                CustomerAccount account
                in _tableClient.QueryAsync<CustomerAccount>(
                    customer =>
                        customer.PartitionKey ==
                        "CustomerAccounts"
                ))
            {
                accounts.Add(account);
            }

            return accounts;
        }

        public async Task DeleteAccountAsync(
            string partitionKey,
            string rowKey)
        {
            await _tableClient.DeleteEntityAsync(
                partitionKey,
                rowKey
            );
        }
    }
}