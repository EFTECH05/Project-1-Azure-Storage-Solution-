
using Microsoft.AspNetCore.Mvc;
using Retail_management_system.Models;
using Retail_management_system.Services;

namespace Retail_management_system.Controllers
{
    public class CustomersController : Controller
    {
        private readonly CustomerTableService _customerTableService;
        private readonly ApplicationLogService _applicationLogService;

        public CustomersController(
            CustomerTableService customerTableService,
            ApplicationLogService applicationLogService)
        {
            _customerTableService = customerTableService;
            _applicationLogService = applicationLogService;
        }

        // =====================================================
        // DISPLAY ALL CUSTOMERS
        // =====================================================

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var customers =
                await _customerTableService.GetCustomersAsync();

            return View(customers);
        }

        // =====================================================
        // DISPLAY CREATE CUSTOMER FORM
        // =====================================================

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // =====================================================
        // CREATE CUSTOMER
        // =====================================================

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(
            Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return View(customer);
            }

            await _customerTableService.AddCustomerAsync(
                customer
            );

            await _applicationLogService.WriteLogAsync(
                $"Customer created successfully. Name: {customer.Name}, Email: {customer.Email}"
            );

            return RedirectToAction(
                nameof(Index)
            );
        }

        // =====================================================
        // DELETE CUSTOMER
        // =====================================================

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(
            string partitionKey,
            string rowKey)
        {
            await _customerTableService.DeleteCustomerAsync(
                partitionKey,
                rowKey
            );

            await _applicationLogService.WriteLogAsync(
                $"Customer deleted successfully. PartitionKey: {partitionKey}, RowKey: {rowKey}"
            );

            return RedirectToAction(
                nameof(Index)
            );
        }
    }
}

