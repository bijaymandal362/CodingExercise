﻿using CodingExercise.Models;
using CodingExercise.Services.PresentationService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodingExercise.Controllers
{
    
    public class PresentationController : BaseApiController
    {
        private readonly IPresentationService _iPresentationService;
        public PresentationController(IPresentationService iPresentationService)
        {
            _iPresentationService=iPresentationService;
        }


        [HttpGet("GetPresentationList")]
        public async Task<IActionResult> GetPresentationList()
        {
            return HandleResult( await _iPresentationService.GetAllPresentations());
        }

        [HttpGet]
        [Route("GetPresentationById/{id}")]
        public async Task<IActionResult> GetPresentationById([FromRoute]int id)
        {
            return HandleResult(await _iPresentationService.GetPresentationById(id));
        }

        [HttpPost("AddPresentation")]
        public async Task<IActionResult> AddPresentation([FromBody] PresentationViewModel presentation)
        {
          return  HandleResult(await _iPresentationService.AddPresentation(presentation));
        }


        [HttpPut]
        [Route("UpdatePresentation")]
        public async Task<IActionResult> UpdatePresentation([FromBody] PresentationViewModel presentation)
        {
            return HandleResult(await _iPresentationService.UpdatePresentation(presentation));
        }

        [HttpDelete]
        [Route("DeletePresentation/{id}")]
        public async Task<IActionResult> DeletePresentation([FromRoute]int id)
        {
            return HandleResult(await _iPresentationService.DeletePresentation(id));
        }

    }
}