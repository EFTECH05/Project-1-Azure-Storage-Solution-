
using Retail_management_system.Services;

var builder = WebApplication.CreateBuilder(args);


// =====================================================
// SERVICES
// =====================================================

// MVC + API Controllers
builder.Services.AddControllersWithViews();


// =====================================================
// AZURE TABLE STORAGE
// =====================================================

builder.Services.AddSingleton<CustomerTableService>();

builder.Services.AddSingleton<CustomerAccountTableService>();

builder.Services.AddSingleton<ProductTableService>();


// =====================================================
// AZURE BLOB STORAGE
// =====================================================

builder.Services.AddSingleton<BlobStorageService>();


// =====================================================
// AZURE QUEUE STORAGE
// =====================================================

builder.Services.AddSingleton<OrderQueueService>();

builder.Services.AddSingleton<InventoryQueueService>();


// =====================================================
// AZURE FILE STORAGE
// =====================================================

builder.Services.AddSingleton<ApplicationLogService>();


// =====================================================
// CORS
// =====================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
            .WithOrigins(
                // =============================================
                // React / Vite development servers
                // =============================================

                "http://localhost:5173",
                "https://localhost:5173",

                "http://localhost:5174",
                "https://localhost:5174"

            // =============================================
            // Production React frontend
            // Add your Azure frontend URL here later.
            // =============================================
            //
            // "https://your-frontend.azurestaticapps.net"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


// =====================================================
// BUILD APPLICATION
// =====================================================

var app = builder.Build();


// =====================================================
// ERROR HANDLING
// =====================================================

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");

    app.UseHsts();
}


// =====================================================
// HTTPS
// =====================================================

// Redirect HTTP requests to HTTPS.
app.UseHttpsRedirection();


// =====================================================
// STATIC FILES
// =====================================================

// Allows ASP.NET Core to serve files from wwwroot.
app.UseStaticFiles();


// =====================================================
// ROUTING
// =====================================================

app.UseRouting();


// =====================================================
// CORS
// =====================================================

// Must be placed after UseRouting()
// and before the endpoints are mapped.
app.UseCors("ReactPolicy");


// =====================================================
// AUTHORIZATION
// =====================================================

app.UseAuthorization();


// =====================================================
// API CONTROLLERS
// =====================================================

// Examples:
//
// GET /Products/api
// GET /Products/api/{id}
//
// POST /Products/Create
// POST /Products/Delete
//
// GET /api/auth/register
// GET /api/auth/login

app.MapControllers();


// =====================================================
// MVC ROUTING
// =====================================================

// Default MVC route:
//
// /
// /Home
// /Home/Index
// /Home/Index/{id}

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);


// =====================================================
// APPLICATION START
// =====================================================

app.Run();

