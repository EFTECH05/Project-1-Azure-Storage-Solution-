using Microsoft.AspNetCore.Mvc;
using Retail_management_system.Models;
using Retail_management_system.Services;

namespace Retail_management_system.Controllers
{
    [Route("Products")]
    public class ProductsController : Controller
    {
        private readonly ProductTableService _productTableService;
        private readonly BlobStorageService _blobStorageService;

        public ProductsController(
            ProductTableService productTableService,
            BlobStorageService blobStorageService)
        {
            _productTableService = productTableService;
            _blobStorageService = blobStorageService;
        }


        // =====================================================
        // API - GET ALL PRODUCTS
        // =====================================================

        [HttpGet("api")]
        public async Task<IActionResult> GetProducts()
        {
            var products =
                await _productTableService.GetProductsAsync();

            return Json(products);
        }


        // =====================================================
        // API - GET SINGLE PRODUCT
        // =====================================================

        [HttpGet("api/{id}")]
        public async Task<IActionResult> GetProduct(string id)
        {
            var products =
                await _productTableService.GetProductsAsync();

            var product = products.FirstOrDefault(
                p => p.RowKey == id
            );

            if (product == null)
            {
                return NotFound(new
                {
                    message = "Product not found."
                });
            }

            return Json(product);
        }


        // =====================================================
        // MVC - DISPLAY PRODUCTS
        // =====================================================

        [HttpGet("")]
        public async Task<IActionResult> Index()
        {
            var products =
                await _productTableService.GetProductsAsync();

            return View(products);
        }


        // =====================================================
        // CREATE - DISPLAY FORM
        // =====================================================

        [HttpGet("Create")]
        public IActionResult Create()
        {
            return View();
        }


        // =====================================================
        // CREATE - SAVE PRODUCT
        // =====================================================

        [HttpPost("Create")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(
            Product product,
            IFormFile? imageFile)
        {
            // =================================================
            // VALIDATE PRODUCT
            // =================================================

            if (!ModelState.IsValid)
            {
                return View(product);
            }


            // =================================================
            // UPLOAD IMAGE
            // =================================================

            if (imageFile != null && imageFile.Length > 0)
            {
                var allowedExtensions = new[]
                {
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".gif",
                    ".webp"
                };


                var extension =
                    Path.GetExtension(imageFile.FileName)
                        .ToLowerInvariant();


                // ---------------------------------------------
                // CHECK FILE EXTENSION
                // ---------------------------------------------

                if (!allowedExtensions.Contains(extension))
                {
                    ModelState.AddModelError(
                        "imageFile",
                        "Only JPG, JPEG, PNG, GIF and WEBP images are allowed."
                    );

                    return View(product);
                }


                // ---------------------------------------------
                // CHECK FILE SIZE
                // Maximum 5 MB
                // ---------------------------------------------

                if (imageFile.Length > 5 * 1024 * 1024)
                {
                    ModelState.AddModelError(
                        "imageFile",
                        "The image cannot be larger than 5 MB."
                    );

                    return View(product);
                }


                // ---------------------------------------------
                // UPLOAD TO AZURE BLOB STORAGE
                // ---------------------------------------------

                using var stream =
                    imageFile.OpenReadStream();


                var imageUrl =
                    await _blobStorageService.UploadImageAsync(
                        stream,
                        imageFile.FileName,
                        imageFile.ContentType
                    );


                // ---------------------------------------------
                // SAVE IMAGE URL
                // ---------------------------------------------

                product.ImageUrl = imageUrl;
            }


            // =================================================
            // SAVE PRODUCT TO AZURE TABLE STORAGE
            // =================================================

            await _productTableService.AddProductAsync(product);


            // =================================================
            // REDIRECT TO PRODUCT LIST
            // =================================================

            return RedirectToAction(nameof(Index));
        }


        // =====================================================
        // IMAGE - GET IMAGE FROM AZURE BLOB STORAGE
        // =====================================================

        [HttpGet("Image")]
        public async Task<IActionResult> Image(string blobName)
        {
            // ---------------------------------------------
            // Validate blob name
            // ---------------------------------------------

            if (string.IsNullOrWhiteSpace(blobName))
            {
                return NotFound();
            }


            // ---------------------------------------------
            // Decode URL-encoded blob name
            // ---------------------------------------------

            blobName =
                Uri.UnescapeDataString(blobName);


            // ---------------------------------------------
            // Get image from Azure Blob Storage
            // ---------------------------------------------

            var result =
                await _blobStorageService.GetImageAsync(
                    blobName
                );


            // ---------------------------------------------
            // Blob doesn't exist
            // ---------------------------------------------

            if (result == null)
            {
                return NotFound();
            }


            // ---------------------------------------------
            // Return image to browser
            // ---------------------------------------------

            return File(
                result.Value.Stream,
                result.Value.ContentType
            );
        }


        // =====================================================
        // DELETE PRODUCT
        // =====================================================

        [HttpPost("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(
            string partitionKey,
            string rowKey)
        {
            await _productTableService.DeleteProductAsync(
                partitionKey,
                rowKey
            );


            return RedirectToAction(
                nameof(Index)
            );
        }
    }
}