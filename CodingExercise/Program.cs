using CodingExercise.Data;
using CodingExercise.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseInMemoryDatabase("dbPresentation"));
builder.Services.AddCustomServices(builder.Configuration);

var app = builder.Build();

app.UseCustomMiddleware();
app.UseCustomMiddlewareForEnvironment(app.Environment);
// Configure the HTTP request pipeline.

app.Run();