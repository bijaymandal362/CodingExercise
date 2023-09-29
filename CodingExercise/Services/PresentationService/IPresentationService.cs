using CodingExercise.Models;
using CodingExercise.Models.Core;

namespace CodingExercise.Services.PresentationService
{
    public interface IPresentationService
    {
        Task<Result<List<PresentationViewModel>>> GetAllPresentations();
        Task<Result<PresentationViewModel>> GetPresentationById(int id);
        Task<Result<string>> AddPresentation(PresentationViewModel presentation);
        Task<Result<string>> UpdatePresentation(PresentationViewModel presentation);
        Task<Result<string>> DeletePresentation(int id);
    }
}
