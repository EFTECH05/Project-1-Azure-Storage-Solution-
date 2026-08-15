using Retail_management_system.Services;

var builder = WebApplication.CreateBuilder(args);


// =====================================================
// SERVICES
// =====================================================

// MVC + API Controllers
builder.Services.AddControllersWithViews();


// =====================================================
// AZURE TABLE STORAGE SERVICES
// =====================================================

// Customer data
builder.Services.AddSingleton<CustomerTableService>();

// Product data and inventory
builder.Services.AddSingleton<ProductTableService>();


// =====================================================
// AZURE BLOB STORAGE SERVICE
// =====================================================

// Product images
builder.Services.AddSingleton<BlobStorageService>();


// =====================================================
// AZURE QUEUE STORAGE SERVICES
// =====================================================

// Order processing
builder.Services.AddSingleton<OrderQueueService>();

// Inventory processing
builder.Services.AddSingleton<InventoryQueueService>();


// =====================================================
// AZURE FILE STORAGE SERVICE
// =====================================================

// Application log files
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
                "http://localhost:5173",
                "https://localhost:5173",
                "http://localhost:5174",
                "https://localhost:5174"
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
// HTTP REQUEST PIPELINE
// =====================================================

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}


// =====================================================
// HTTPS
// =====================================================

app.UseHttpsRedirection();


// =====================================================
// STATIC FILES
// =====================================================

app.UseStaticFiles();


// =====================================================
// ROUTING
// =====================================================

app.UseRouting();


// =====================================================
// CORS
// =====================================================

app.UseCors("ReactPolicy");


// =====================================================
// AUTHORIZATION
// =====================================================

app.UseAuthorization();


// =====================================================
// API + ATTRIBUTE ROUTED CONTROLLERS
// =====================================================

app.MapControllers();


// =====================================================
// MVC ROUTING
// =====================================================

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);


// =====================================================
// RUN APPLICATION
// =====================================================

app.Run();