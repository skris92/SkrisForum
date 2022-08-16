namespace SkrisForum.Data.Repositories
{
    public interface IRepository<T>
    {
        Task Add(T entity);
        Task Delete(Guid id);
        Task<T> GetAll();
        Task<T> GetById(Guid id);
        Task Update(T entity);
    }
}
