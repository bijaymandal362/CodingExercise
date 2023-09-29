using CodingExercise.Data;
using CodingExercise.Entities;
using CodingExercise.Infrastructure.Exceptions;
using CodingExercise.Models;
using CodingExercise.Models.Constant;
using CodingExercise.Models.Core;
using Microsoft.EntityFrameworkCore;

namespace CodingExercise.Services.PresentationService
{
    public class PresentationService : IPresentationService
    {
        
        private readonly ILogger<PresentationService> _iLogger;

        private readonly ApplicationDbContext _context;
        public PresentationService(ILogger<PresentationService> logger, ApplicationDbContext context)
        {
            _iLogger= logger;
            _context = context;
        }


      
        public async Task<Result<string>> AddPresentation(PresentationViewModel presentation)
        {
            try
            {
                
                Presentation addPresentation = new()
                {
                    Id = presentation.Id,
                    Title = presentation.Title,
                    PresenterName = presentation.Title,
                    DurationInMinutes = presentation.DurationInMinutes
                };

                await _context.AddAsync(addPresentation);
                await _context.SaveChangesAsync();
                return Result<string>.Success(ReturnMessage.SavedSuccessfully);

            }
            catch (Exception ex)
            {
                _iLogger.LogError(ex, ReturnMessage.ErrorOccuredWhileAddingPresentation);
                return Result<string>.Error(ReturnMessage.ErrorOccuredWhileAddingPresentation);

            }
        }

        public async Task<Result<string>> DeletePresentation(int id)
        {
            try
            {
                var presentation = await _context.Presentations.Where(p => p.Id == id).FirstOrDefaultAsync();
                if (presentation != null)
                {
                     _context.Presentations.Remove(presentation);
                    await _context.SaveChangesAsync();
                    return Result<string>.Success(ReturnMessage.DeleteSuccessfully);
                }
                else
                {
                    throw new PresentationIdNotFoundException();
                }
               
            }
            catch (Exception ex)
            {
                if (ex is PresentationIdNotFoundException)
                {
                    _iLogger.LogError(ex, ReturnMessage.PresentationIdNotFound);
                    return Result<string>.Error(ReturnMessage.PresentationIdNotFound);
                }
                _iLogger.LogError(ex, ReturnMessage.ErrorOccuredWhileDeletingPresentation);
                return Result<string>.Error(ReturnMessage.ErrorOccuredWhileDeletingPresentation);

            }
        }

        public  async Task<Result<List<PresentationViewModel>>> GetAllPresentations()
        {
            try
            {
               var getAllPresentationList = await _context.Presentations.Select(x=> new PresentationViewModel()
               {
                   Id = x.Id,
                   Title= x.Title,
                   PresenterName =x.PresenterName,
                   DurationInMinutes = x.DurationInMinutes                      
               }).ToListAsync();

                if(getAllPresentationList.Any())
                {
                    return Result<List<PresentationViewModel>>.Success(getAllPresentationList);
                }
                else
                {
                    return Result<List<PresentationViewModel>>.Success(null);
                }
            }
            catch(Exception ex)
            {
                _iLogger.LogError(ex, ReturnMessage.ErrorOccured);
                return Result<List<PresentationViewModel>>.Error(ReturnMessage.ErrorOccured);
            }
           
        }

        public async Task<Result<PresentationViewModel>> GetPresentationById(int id)
        {
            try
            {
                var presentation = await _context.Presentations.Where(x => x.Id == id).FirstOrDefaultAsync();
                if (presentation == null)
                {
                    throw new PresentationIdNotFoundException();
                }
                else
                {
                    var viewModelPresentation = new PresentationViewModel
                    {
                        Id = presentation.Id,
                        Title = presentation.Title,
                        PresenterName = presentation.PresenterName,
                        DurationInMinutes = presentation.DurationInMinutes                     
                    };
                    return Result<PresentationViewModel>.Success(viewModelPresentation);
                }
            }
            catch(Exception ex)
            {
                if(ex is PresentationIdNotFoundException)
                {
                    _iLogger.LogError(ex, ReturnMessage.PresentationIdNotFound);
                    return Result<PresentationViewModel>.Error(ReturnMessage.PresentationIdNotFound);
                }
                _iLogger.LogError(ex, ReturnMessage.ErrorOccuredWithId);
                return Result<PresentationViewModel>.Error(ReturnMessage.ErrorOccuredWithId);
            }
        }

        public async Task<Result<string>> UpdatePresentation(PresentationViewModel presentation)
        {
            try
            {
                var existingPresentation = await _context.Presentations.FirstOrDefaultAsync(p => p.Id == presentation.Id);
                if (existingPresentation != null)
                {
                    existingPresentation.Title = presentation.Title;
                    existingPresentation.PresenterName = presentation.PresenterName;
                    existingPresentation.DurationInMinutes = presentation.DurationInMinutes;

                    _context.Presentations.Update(existingPresentation);
                    await _context.SaveChangesAsync();
                }
                return Result<string>.Success(ReturnMessage.UpdateSuccessfully);
            }
            catch (Exception ex)
            {
                _iLogger.LogError(ex, ReturnMessage.ErrorOccuredWhileUpdatingPresentation);
                return Result<string>.Error(ReturnMessage.ErrorOccuredWhileUpdatingPresentation);

            }
        }
    }
}
