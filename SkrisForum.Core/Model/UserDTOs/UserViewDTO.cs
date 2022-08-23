using SkrisForum.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkrisForum.Core.Model.UserDTOs
{
    public class UserViewDTO
    {
        public Guid Id { get; set; }

        public string EmailAddress { get; set; }

        public string Username { get; set; }

        public string Role { get; set; }
    }
}
