using CodingExercise.Data;
using CodingExercise.Services.AuthService;
using CodingExercise.Services.PresentationService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace CodingExercise.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddCustomServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Add services to the container.
           

            services.AddControllers();

            //inmemoryDB
           
            //builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddScoped<IPresentationService, PresentationService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenRevocationService, TokenRevocationService>();




            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            .AddJwtBearer(options =>
            {   // for development only
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["JWT:SecretKey"])),
                    ValidateIssuer = true,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:Audience"]
                };
            });

            services.AddCors(c => c.AddPolicy("corspolicy", build =>
            {
                build.WithOrigins("https://localhost:44461").AllowAnyMethod().AllowAnyHeader();
            }));

            services.AddHealthChecks();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "JWT Auth Sample",
                    Version = "v1"
                });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer jhfdkj.jkdsakjdsa.jkdsajk\"",
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                 {
                         new OpenApiSecurityScheme {
                              Reference = new OpenApiReference {
                                Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                              }
                         },
                        new string[] {}
                 }
                });
            });
        }
    }
}
