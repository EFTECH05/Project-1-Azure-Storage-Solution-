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
                "http://localhost:5173",
                "https://localhost:5173",

                "http://localhost:5174",
                "https://localhost:5174",

                "http://localhost:5175",
                "https://localhost:5175",

                // YOUR FRONTEND
                "http://localhost:5179",
                "https://localhost:5179"
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
// API
// =====================================================

app.MapControllers();


// =====================================================
// MVC
// =====================================================

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);


// =====================================================
// START
// =====================================================

app.Run();