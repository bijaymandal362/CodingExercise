namespace CodingExercise.Extensions
{
    public static class MiddlewareExtensions
    {
        public async static Task UseCustomMiddleware(this IApplicationBuilder app)
        {
            await DataSeeder.SeedPresentationData(app);
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors("corspolicy");
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
            });
        }

        public static void UseCustomMiddlewareForEnvironment(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
        }
    }
}
