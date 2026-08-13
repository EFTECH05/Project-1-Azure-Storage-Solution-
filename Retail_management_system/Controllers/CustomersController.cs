using Microsoft.AspNetCore.Mvc;
using Retail_management_system.Models;
using Retail_management_system.Services;

namespace Retail_management_system.Controllers
{
    public class CustomersController : Controller
    {
        private readonly CustomerTableService _customerTableService;

        public CustomersController(CustomerTableService customerTableService)
        {
            _customerTableService = customerTableService;
        }

        // Display all customers
        public async Task<IActionResult> Index()
        {
            var customers = await _customerTableService.GetCustomersAsync();

            return View(customers);
        }

        // Display Add Customer form
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // Save customer to Azure
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return View(customer);
            }

            await _customerTableService.AddCustomerAsync(customer);

            return RedirectToAction(nameof(Index));
        }

        // Delete customer
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(
            string partitionKey,
            string rowKey)
        {
            await _customerTableService.DeleteCustomerAsync(
                partitionKey,
                rowKey);

            return RedirectToAction(nameof(Index));
        }
    }
}