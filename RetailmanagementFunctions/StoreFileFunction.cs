
using Azure.Storage.Files.Shares;
using Azure.Storage.Files.Shares.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using static System.Net.Mime.MediaTypeNames;

namespace RetailmanagementFunctions
{
    public class StoreFileFunction
    {
        private readonly ILogger<StoreFileFunction> _logger;
        private readonly ShareClient _shareClient;
        private readonly ShareDirectoryClient _directoryClient;

        public StoreFileFunction(ILogger<StoreFileFunction> logger)
        {
            _logger = logger;

            string connectionString =
                Environment.GetEnvironmentVariable("AzureStorageConnection")
                ?? throw new InvalidOperationException(
                    "Azure Storage connection string is not configured."
                );

            _shareClient = new ShareClient(
                connectionString,
                "application-logs"
            );

            _shareClient.CreateIfNotExists();

            _directoryClient =
                _shareClient.GetRootDirectoryClient();
        }

        [Function("StoreFileFunction")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post")]
            HttpRequest req)
        {
            _logger.LogInformation(
                "StoreFileFunction started."
            );

            try
            {
                // Make sure the request contains a file
                if (!req.HasFormContentType)
                {
                    return new BadRequestObjectResult(
                        "Request must use multipart/form-data."
                    );
                }

                // Read the uploaded form
                var form = await req.ReadFormAsync();

                // The Postman form-data key must be "file"
                var file = form.Files["file"];

                if (file == null || file.Length == 0)
                {
                    return new BadRequestObjectResult(
                        "Please provide a file using the form-data key 'file'."
                    );
                }

                // Get the original file extension
                string extension =
                    Path.GetExtension(file.FileName)
                    .ToLowerInvariant();

                // Create a safe unique file name
                string fileName =
                    $"uploaded-{Guid.NewGuid()}{extension}";

                // Create a file inside the Azure File Share
                ShareFileClient fileClient =
                    _directoryClient.GetFileClient(fileName);

                await fileClient.CreateAsync(file.Length);

                // Upload the file contents
                using Stream stream =
                    file.OpenReadStream();

                await fileClient.UploadAsync(stream);

                _logger.LogInformation(
                    "File {FileName} was successfully uploaded to Azure Files.",
                    fileName
                );

                return new OkObjectResult(
                    new
                    {
                        message =
                            "File uploaded successfully to Azure Files.",

                        fileName = fileName,

                        shareName =
                            "application-logs",

                        size =
                            file.Length,

                        contentType =
                            file.ContentType
                    }
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error uploading file to Azure Files."
                );

                return new ObjectResult(
                    "An error occurred while uploading the file to Azure Files."
                )
                {
                    StatusCode = 500
                };
            }
        }
    }
}
