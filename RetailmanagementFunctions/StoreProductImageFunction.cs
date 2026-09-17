
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace RetailmanagementFunctions
{
    public class StoreProductImageFunction
    {
        private readonly ILogger<StoreProductImageFunction> _logger;
        private readonly BlobContainerClient _containerClient;

        public StoreProductImageFunction(
            ILogger<StoreProductImageFunction> logger)
        {
            _logger = logger;

            string connectionString =
                Environment.GetEnvironmentVariable(
                    "AzureStorageConnection"
                )
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured."
                );

            _containerClient = new BlobContainerClient(
                connectionString,
                "product-images"
            );

            _containerClient.CreateIfNotExists();
        }

        [Function("StoreProductImageFunction")]
        public async Task<IActionResult> Run(
            [HttpTrigger(
                AuthorizationLevel.Function,
                "post"
            )] HttpRequest req)
        {
            _logger.LogInformation(
                "StoreProductImageFunction started."
            );

            try
            {
                if (!req.HasFormContentType)
                {
                    return new BadRequestObjectResult(
                        "Request must use multipart/form-data."
                    );
                }

                var form = await req.ReadFormAsync();

                var file = form.Files["file"];

                if (file == null || file.Length == 0)
                {
                    return new BadRequestObjectResult(
                        "Please provide an image file."
                    );
                }

                string extension =
                    Path.GetExtension(file.FileName)
                        .ToLowerInvariant();

                string[] allowedExtensions =
                {
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".gif",
                    ".webp"
                };

                if (!allowedExtensions.Contains(extension))
                {
                    return new BadRequestObjectResult(
                        "Only JPG, JPEG, PNG, GIF and WEBP images are allowed."
                    );
                }

                string blobName =
                    $"{Guid.NewGuid()}{extension}";

                BlobClient blobClient =
                    _containerClient.GetBlobClient(
                        blobName
                    );

                using Stream stream =
                    file.OpenReadStream();

                await blobClient.UploadAsync(
                    stream,
                    new BlobUploadOptions
                    {
                        HttpHeaders =
                            new BlobHttpHeaders
                            {
                                ContentType =
                                    file.ContentType
                            }
                    }
                );

                string imageUrl =
                    blobClient.Uri.ToString();

                _logger.LogInformation(
                    "Product image {BlobName} uploaded successfully.",
                    blobName
                );

                return new OkObjectResult(
                    new
                    {
                        message =
                            "Product image uploaded successfully to Azure Blob Storage.",

                        blobName = blobName,

                        imageUrl = imageUrl,

                        contentType =
                            file.ContentType,

                        size =
                            file.Length
                    }
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error uploading product image to Azure Blob Storage."
                );

                return new ObjectResult(
                    "An error occurred while uploading the product image."
                )
                {
                    StatusCode = 500
                };
            }
        }
    }
}
