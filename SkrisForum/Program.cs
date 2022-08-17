using Microsoft.EntityFrameworkCore;
using SkrisForum.Data;
using SkrisForum.Data.Entities;
using SkrisForum.Data.Repositories;
using SkrisForum.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add datastore service
builder.Services.AddDbContext<SkrisForumDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add data repository services
builder.Services.AddTransient<IRepository<User>, UserRepository>();

// Add data logic services
builder.Services.AddTransient<UserService>();

// Add dataseeder service
builder.Services.AddTransient<DataSeeder>();

var app = builder.Build();

// Seed initial data
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var initialiser = services.GetRequiredService<DataSeeder>();
initialiser.Seed();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
