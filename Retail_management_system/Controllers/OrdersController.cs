using Microsoft.AspNetCore.Mvc;
using Retail_management_system.Services;

namespace Retail_management_system.Controllers
{
    public class OrdersController : Controller
    {
        private readonly OrderQueueService _orderQueueService;
        private readonly ApplicationLogService _applicationLogService;

        public OrdersController(
            OrderQueueService orderQueueService,
            ApplicationLogService applicationLogService)
        {
            _orderQueueService = orderQueueService;
            _applicationLogService = applicationLogService;
        }

        // ==========================================
        // DISPLAY ORDERS
        // ==========================================

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var orders =
                    await _orderQueueService.GetOrdersAsync();

                await _applicationLogService.WriteLogAsync(
                    $"Orders page viewed. Orders retrieved: {orders.Count}");

                return View(orders);
            }
            catch (Exception ex)
            {
                await _applicationLogService.WriteLogAsync(
                    $"ERROR retrieving orders: {ex.Message}");

                throw;
            }
        }


        // ==========================================
        // DISPLAY CREATE ORDER PAGE
        // ==========================================

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }


        // ==========================================
        // CREATE ORDER
        // ==========================================

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(
            string customerName,
            string productName,
            int quantity)
        {
            // Validate customer
            if (string.IsNullOrWhiteSpace(customerName))
            {
                ModelState.AddModelError(
                    "customerName",
                    "Customer name is required.");
            }

            // Validate product
            if (string.IsNullOrWhiteSpace(productName))
            {
                ModelState.AddModelError(
                    "productName",
                    "Product name is required.");
            }

            // Validate quantity
            if (quantity <= 0)
            {
                ModelState.AddModelError(
                    "quantity",
                    "Quantity must be greater than zero.");
            }

            // Return form if validation fails
            if (!ModelState.IsValid)
            {
                return View();
            }

            try
            {
                // ==========================================
                // CREATE ORDER
                // ==========================================

                var order = new
                {
                    OrderId = Guid.NewGuid().ToString(),
                    CustomerName = customerName,
                    ProductName = productName,
                    Quantity = quantity,
                    OrderDate = DateTime.UtcNow,
                    Status = "Pending"
                };


                // ==========================================
                // SEND ORDER TO AZURE QUEUE
                // ==========================================

                await _orderQueueService.SendOrderAsync(order);


                // ==========================================
                // WRITE LOG TO AZURE FILES
                // ==========================================

                await _applicationLogService.WriteLogAsync(
                    $"Order created successfully. " +
                    $"OrderId: {order.OrderId}, " +
                    $"Customer: {order.CustomerName}, " +
                    $"Product: {order.ProductName}, " +
                    $"Quantity: {order.Quantity}, " +
                    $"Status: {order.Status}");


                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                // ==========================================
                // LOG ERROR TO AZURE FILES
                // ==========================================

                await _applicationLogService.WriteLogAsync(
                    $"ERROR creating order. " +
                    $"Customer: {customerName}, " +
                    $"Product: {productName}, " +
                    $"Quantity: {quantity}, " +
                    $"Error: {ex.Message}");


                ModelState.AddModelError(
                    "",
                    "An error occurred while creating the order.");

                return View();
            }
        }
    }
}