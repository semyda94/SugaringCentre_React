using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData (DataContext context, UserManager<AppUser> userManager) {
            if (!userManager.Users.Any()) {
                var users = new List<AppUser> 
                {
                    new AppUser {
                        DisplayName = "Dmitrii.S",
                        UserName = "dmitrii.admin",
                        Email = "semykindmitrii94@gmail.com"
                    },
                    new AppUser {
                        DisplayName = "Daria.V",
                        UserName = "daria.admin",
                        Email = "test.gmail.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
}