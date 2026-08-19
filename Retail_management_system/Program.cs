using Retail_management_system.Services;

var builder = WebApplication.CreateBuilder(args);

// =====================================================
// SERVICES
// =====================================================

builder.Services.AddControllersWithViews();


// =====================================================
// AZURE TABLE STORAGE
// =====================================================

builder.Services.AddSingleton<CustomerTableService>();
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
                "http://localhost:5173",
                "https://localhost:5173"

            // Add your Azure React URL here
            // after you publish the frontend.
            //
            // Example:
            // "https://yourfrontend.azurewebsites.net"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


// =====================================================
// BUILD
// =====================================================

var app = builder.Build();


// =====================================================
// HTTP PIPELINE
// =====================================================

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}


// =====================================================
// STATIC FILES
// =====================================================

app.UseStaticFiles();


// =====================================================
// HTTPS
// =====================================================

app.UseHttpsRedirection();


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
// CONTROLLERS
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
// RUN
// =====================================================

app.Run();