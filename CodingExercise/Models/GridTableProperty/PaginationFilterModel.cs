namespace CodingExercise.Models.GridTableProperty
{
    public class PaginationFilterModel
    {
        public int PageNumber { get; set; }
        public string? SearchValue { get; set; }
        public int PageSize { get; set; }
        public PaginationFilterModel()
        {
            this.PageNumber = 1;
            this.PageSize = 10;
        }
        public PaginationFilterModel(int pageNumber, int pageSize)
        {
            this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
            this.PageSize = pageSize > 1 ? 10 : pageSize;
        }
    }
}
