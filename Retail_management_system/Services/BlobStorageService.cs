using Azure;
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
                    "Azure Storage connection string is not configured."
                );

            _containerClient = new BlobContainerClient(
                connectionString,
                "product-images"
            );

            _containerClient.CreateIfNotExists();
        }


        // =====================================================
        // UPLOAD PRODUCT IMAGE
        // =====================================================

        public async Task<string> UploadImageAsync(
            Stream stream,
            string fileName,
            string contentType)
        {
            if (stream == null)
            {
                throw new ArgumentException(
                    "Image stream is missing."
                );
            }


            string extension =
                Path.GetExtension(fileName)
                    .ToLowerInvariant();


            string blobName =
                $"{Guid.NewGuid()}{extension}";


            BlobClient blobClient =
                _containerClient.GetBlobClient(blobName);


            await blobClient.UploadAsync(
                stream,
                new BlobUploadOptions
                {
                    HttpHeaders =
                        new BlobHttpHeaders
                        {
                            ContentType = contentType
                        }
                }
            );


            return blobClient.Uri.ToString();
        }


        // =====================================================
        // GET IMAGE FROM AZURE BLOB STORAGE
        // =====================================================

        public async Task<(Stream Stream, string ContentType)?> GetImageAsync(
            string blobName)
        {
            if (string.IsNullOrWhiteSpace(blobName))
            {
                return null;
            }


            // Decode URL-encoded blob names if necessary
            blobName =
                Uri.UnescapeDataString(blobName);


            BlobClient blobClient =
                _containerClient.GetBlobClient(blobName);


            // Check whether the blob exists
            Response<bool> exists =
                await blobClient.ExistsAsync();


            if (!exists.Value)
            {
                return null;
            }


            BlobDownloadResult result =
                await blobClient.DownloadContentAsync();


            string contentType =
                result.Details.ContentType;


            if (string.IsNullOrWhiteSpace(contentType))
            {
                contentType =
                    GetContentType(blobName);
            }


            Stream stream =
                result.Content.ToStream();


            return (
                stream,
                contentType
            );
        }


        // =====================================================
        // DETERMINE IMAGE CONTENT TYPE
        // =====================================================

        private static string GetContentType(
            string blobName)
        {
            string extension =
                Path.GetExtension(blobName)
                    .ToLowerInvariant();


            return extension switch
            {
                ".jpg" => "image/jpeg",
                ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".webp" => "image/webp",
                ".bmp" => "image/bmp",
                ".svg" => "image/svg+xml",
                _ => "application/octet-stream"
            };
        }
    }
}