using Azure.Storage.Queues;
using System.Text.Json;

namespace Retail_management_system.Services
{
    public class OrderQueueService
    {
        private readonly QueueClient _queueClient;

        public OrderQueueService(IConfiguration configuration)
        {
            string connectionString =
                configuration["AzureStorage:ConnectionString"]
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured.");

            _queueClient = new QueueClient(
                connectionString,
                "orders");

            _queueClient.CreateIfNotExists();
        }

        // Add an order message to the queue
        public async Task SendOrderAsync(object order)
        {
            string message = JsonSerializer.Serialize(order);

            await _queueClient.SendMessageAsync(message);
        }

        // Get messages from the queue
        public async Task<List<string>> GetOrdersAsync()
        {
            var messages = await _queueClient.ReceiveMessagesAsync(
                maxMessages: 10);

            var orders = new List<string>();

            foreach (var message in messages.Value)
            {
                orders.Add(message.MessageText);
            }

            return orders;
        }
    }
}