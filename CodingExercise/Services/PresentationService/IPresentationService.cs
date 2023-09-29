using CodingExercise.Models;
using CodingExercise.Models.Core;
using CodingExercise.Models.GridTableProperty;

namespace CodingExercise.Services.PresentationService
{
    public interface IPresentationService
    {
        Task<Result<PagedResponsePresentationModel<List<PresentationViewModel>>>> GetAllPresentations(PaginationFilterModel paginationFilterModel);
        Task<Result<PresentationViewModel>> GetPresentationById(int id);
        Task<Result<string>> AddPresentation(PresentationViewModel presentation);
        Task<Result<string>> UpdatePresentation(PresentationViewModel presentation);
        Task<Result<string>> DeletePresentation(int id);
    }
}
