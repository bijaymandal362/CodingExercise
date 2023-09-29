using CodingExercise.Data.SeedData;
using CodingExercise.Data;

namespace CodingExercise.Extensions
{
    public class DataSeeder
    {
        public static async Task  SeedPresentationData(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                var dbContext = services.GetRequiredService<ApplicationDbContext>();

                try
                {
                    // Create an instance of SeedData and call its SeedPresentation method
                    var seedData = new SeedData(dbContext);
                   await  seedData.SeedPresentaion();
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred while seeding the data.");
                }
            }
        }
    }
}
