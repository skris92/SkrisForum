namespace SkrisForum.Data.Repositories
{
    public interface IRepository<T>
    {
        Task Add(T entity);
        Task Delete(Guid id);
        Task<List<T>> GetAll();
        Task<T> GetById(Guid id);
        Task<T> Update(T entity);
    }
}
