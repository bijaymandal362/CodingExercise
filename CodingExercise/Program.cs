using CodingExercise.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCustomServices(builder.Configuration);

var app = builder.Build();

await app.UseCustomMiddleware();
app.UseCustomMiddlewareForEnvironment(app.Environment);
// Configure the HTTP request pipeline.

app.Run();