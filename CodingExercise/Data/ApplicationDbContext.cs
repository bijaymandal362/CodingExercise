using CodingExercise.Entities;
using CodingExercise.Entities.LoginAndRegister;
using Microsoft.EntityFrameworkCore;

namespace CodingExercise.Data
{
    public class ApplicationDbContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "PresentationDB");
        }

        public DbSet<Presentation> Presentations { get; set; }
        public DbSet<User> Users { get; set; }
    }
}