﻿namespace CodingExercise.Models.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }

        public string ErrorMessage { get; set; }

        public static Result<T> Success(T value) => new Result<T> { IsSuccess = true, Value = value };

        public static Result<T> Error(string errorMessage) => new Result<T> { IsSuccess = false, ErrorMessage = errorMessage };
    }
}
