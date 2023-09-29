using CodingExercise.Entities;
using CodingExercise.Entities.LoginAndRegister;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace CodingExercise.Data.SeedData
{
    public class SeedData
    {
        private readonly ApplicationDbContext _context;
        public SeedData(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task SeedPresentaion() 
        { 
                List<Presentation> presentationList = new List<Presentation>
                {
                // Add three sample presentations
                        new Presentation
                        {
                            Id = 1,
                            Title = "Ab Presentation 1",
                            PresenterName = "Presenter 1",
                            DurationInMinutes = 30
                        },
                        new Presentation
                        {
                            Id = 2,
                            Title = "QT Presentation 2",
                            PresenterName = "Presenter 2",
                            DurationInMinutes = 45
                        },
                        new Presentation
                        {
                            Id = 3,
                            Title = "AA Presentation 3",
                            PresenterName = "Presenter 3",
                            DurationInMinutes = 60
                        }
                };
            var existingList = _context.Presentations.Select(x=>x.Id).ToList();
            await _context.Presentations.AddRangeAsync(presentationList.Where(x => !existingList.Contains(x.Id)));
            await _context.SaveChangesAsync();
        }
    }
}
