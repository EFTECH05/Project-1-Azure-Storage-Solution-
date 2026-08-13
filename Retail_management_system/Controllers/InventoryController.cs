using Microsoft.AspNetCore.Mvc;
using Retail_management_system.Services;

namespace Retail_management_system.Controllers
{
    public class InventoryController : Controller
    {
        private readonly ProductTableService _productTableService;
        private readonly InventoryQueueService _inventoryQueueService;

        public InventoryController(
            ProductTableService productTableService,
            InventoryQueueService inventoryQueueService)
        {
            _productTableService = productTableService;
            _inventoryQueueService = inventoryQueueService;
        }

        // Display inventory
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var products =
                await _productTableService.GetProductsAsync();

            return View(products);
        }

        // Record inventory information in Azure Queue Storage
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RecordInventory(
            string productId,
            string productName,
            int stockQuantity)
        {
            if (string.IsNullOrWhiteSpace(productId))
            {
                return BadRequest("Product ID is required.");
            }

            if (string.IsNullOrWhiteSpace(productName))
            {
                return BadRequest("Product name is required.");
            }

            var status = stockQuantity switch
            {
                0 => "Out of Stock",
                <= 5 => "Low Stock",
                _ => "In Stock"
            };

            var inventory = new
            {
                InventoryId = Guid.NewGuid().ToString(),
                ProductId = productId,
                ProductName = productName,
                StockQuantity = stockQuantity,
                InventoryDate = DateTime.UtcNow,
                Status = status
            };

            await _inventoryQueueService.SendInventoryAsync(inventory);

            TempData["SuccessMessage"] =
                "Inventory information has been sent to Azure Queue Storage.";

            return RedirectToAction(nameof(Index));
        }
    }
}