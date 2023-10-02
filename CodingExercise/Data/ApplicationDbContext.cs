using CodingExercise.Entities;
using CodingExercise.Entities.LoginAndRegister;
using Microsoft.EntityFrameworkCore;

namespace CodingExercise.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Presentation> Presentations { get; set; }
        public DbSet<User> Users { get; set; }
    }
}