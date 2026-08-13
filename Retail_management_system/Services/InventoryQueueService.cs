using Azure.Storage.Queues;
using System.Text.Json;

namespace Retail_management_system.Services
{
    public class InventoryQueueService
    {
        private readonly QueueClient _queueClient;

        public InventoryQueueService(IConfiguration configuration)
        {
            string connectionString =
                configuration["AzureStorage:ConnectionString"]
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured.");

            _queueClient = new QueueClient(
                connectionString,
                "inventory");

            _queueClient.CreateIfNotExists();
        }

        // ==========================================
        // SEND INVENTORY MESSAGE
        // ==========================================

        public async Task SendInventoryAsync(object inventory)
        {
            string message =
                JsonSerializer.Serialize(inventory);

            await _queueClient.SendMessageAsync(message);
        }

        // ==========================================
        // GET INVENTORY MESSAGES
        // ==========================================

        public async Task<List<string>> GetInventoryAsync()
        {
            var messages =
                await _queueClient.ReceiveMessagesAsync(
                    maxMessages: 10);

            var inventoryMessages =
                new List<string>();

            foreach (var message in messages.Value)
            {
                inventoryMessages.Add(
                    message.MessageText);
            }

            return inventoryMessages;
        }
    }
}