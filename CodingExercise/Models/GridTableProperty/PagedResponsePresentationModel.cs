namespace CodingExercise.Models.GridTableProperty
{
    public class PagedResponsePresentationModel<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }


        public PagedResponsePresentationModel(T data,
            int pageNumber,
            int pageSize,
            int totalRecords,
            int totalPages
           )
        {
            PageNumber = pageNumber;

            PageSize = pageSize;
            Data = data;
            TotalPages = totalPages;
            TotalRecords = totalRecords;
        }
        public T Data { get; set; }
    }
}
