using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace Retail_management_system.Services
{
    public class BlobStorageService
    {
        private readonly BlobContainerClient _containerClient;

        public BlobStorageService(IConfiguration configuration)
        {
            string connectionString =
                configuration["AzureStorage:ConnectionString"]
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured.");

            _containerClient = new BlobContainerClient(
                connectionString,
                "product-images");

            _containerClient.CreateIfNotExists();
        }

        // Upload product image
        public async Task<string> UploadImageAsync(
            Stream stream,
            string fileName,
            string contentType)
        {
            if (stream == null)
            {
                throw new ArgumentException("Image stream is missing.");
            }

            string blobName =
                $"{Guid.NewGuid()}{Path.GetExtension(fileName)}";

            BlobClient blobClient =
                _containerClient.GetBlobClient(blobName);

            await blobClient.UploadAsync(
                stream,
                new BlobUploadOptions
                {
                    HttpHeaders = new BlobHttpHeaders
                    {
                        ContentType = contentType
                    }
                });

            return blobClient.Uri.ToString();
        }

        // Download an image from Azure Blob Storage
        public async Task<(Stream Stream, string ContentType)?> GetImageAsync(
            string blobName)
        {
            BlobClient blobClient =
                _containerClient.GetBlobClient(blobName);

            if (!await blobClient.ExistsAsync())
            {
                return null;
            }

            BlobDownloadResult result =
                await blobClient.DownloadContentAsync();

            string contentType =
                result.Details.ContentType ?? "application/octet-stream";

            return (
                result.Content.ToStream(),
                contentType
            );
        }
    }
}