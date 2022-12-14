namespace SkrisForum.Data.Repositories
{
    public interface IRepository<T>
    {
        Task Add(T entity);
        Task Delete(T entity);
        Task<List<T>> GetAll();
        Task<T> GetById(Guid id);
        Task Update(T entity);
    }
}
