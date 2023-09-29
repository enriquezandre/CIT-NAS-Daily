using CITNASDaily.Repositories.Context;
using CITNASDaily.Repositories.Contracts;
using CITNASDaily.Repositories.Repositories;
using CITNASDaily.Services.Contracts;
using CITNASDaily.Services.Services;
using CITNASDaily.Utils.Mappings;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<NASContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection"));
});

//Repositories
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<INASRepository, NASRepository>();
builder.Services.AddScoped<ISuperiorRepository, SuperiorRepository>();

//Services
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<INASService, NASService>();
builder.Services.AddScoped<ISuperiorService, SuperiorService>();

//Mappings
builder.Services.AddAutoMapper(typeof(RoleProfile));
builder.Services.AddAutoMapper(typeof(SuperiorProfile));
builder.Services.AddAutoMapper(typeof(SuperiorProfile));
builder.Services.AddAutoMapper(typeof(NASProfile));

var app = builder.Build();

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
