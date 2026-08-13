using Azure.Storage.Files.Shares;
using Azure.Storage.Files.Shares.Models;
using System.Text;

namespace Retail_management_system.Services
{
    public class ApplicationLogService
    {
        private readonly ShareClient _shareClient;
        private readonly ShareDirectoryClient _directoryClient;

        public ApplicationLogService(IConfiguration configuration)
        {
            string connectionString =
                configuration["AzureStorage:ConnectionString"]
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured.");

            _shareClient = new ShareClient(
                connectionString,
                "application-logs");

            _shareClient.CreateIfNotExists();

            _directoryClient =
                _shareClient.GetRootDirectoryClient();
        }

        // ==========================================
        // WRITE LOG
        // ==========================================

        public async Task WriteLogAsync(string message)
        {
            string fileName =
                $"application-{DateTime.UtcNow:yyyy-MM-dd}.log";

            ShareFileClient fileClient =
                _directoryClient.GetFileClient(fileName);

            string logEntry =
                $"{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC - {message}{Environment.NewLine}";

            // ==========================================
            // FILE DOES NOT EXIST
            // ==========================================

            if (!await fileClient.ExistsAsync())
            {
                byte[] data =
                    Encoding.UTF8.GetBytes(logEntry);

                // Create the Azure File with the correct size
                await fileClient.CreateAsync(data.Length);

                // Upload the contents
                using MemoryStream stream =
                    new MemoryStream(data);

                await fileClient.UploadAsync(
                    stream);

                return;
            }

            // ==========================================
            // FILE ALREADY EXISTS
            // ==========================================

            ShareFileDownloadInfo download =
                await fileClient.DownloadAsync();

            using StreamReader reader =
                new StreamReader(download.Content);

            string existingLog =
                await reader.ReadToEndAsync();

            // Add the new entry
            string completeLog =
                existingLog + logEntry;

            byte[] completeData =
                Encoding.UTF8.GetBytes(completeLog);


            // ==========================================
            // RESIZE EXISTING FILE
            // ==========================================

            await fileClient.CreateAsync(
                completeData.Length);


            // ==========================================
            // UPLOAD COMPLETE FILE
            // ==========================================

            using MemoryStream uploadStream =
                new MemoryStream(completeData);

            await fileClient.UploadAsync(
                uploadStream);
        }


        // ==========================================
        // GET TODAY'S LOG
        // ==========================================

        public async Task<string> GetLogAsync()
        {
            string fileName =
                $"application-{DateTime.UtcNow:yyyy-MM-dd}.log";

            ShareFileClient fileClient =
                _directoryClient.GetFileClient(fileName);

            if (!await fileClient.ExistsAsync())
            {
                return string.Empty;
            }

            ShareFileDownloadInfo download =
                await fileClient.DownloadAsync();

            using StreamReader reader =
                new StreamReader(download.Content);

            return await reader.ReadToEndAsync();
        }


        // ==========================================
        // GET ALL LOG FILES
        // ==========================================

        public async Task<List<string>> GetLogFilesAsync()
        {
            var files = new List<string>();

            await foreach (
                ShareFileItem item
                in _directoryClient.GetFilesAndDirectoriesAsync())
            {
                if (!item.IsDirectory)
                {
                    files.Add(item.Name);
                }
            }

            return files;
        }
    }
}