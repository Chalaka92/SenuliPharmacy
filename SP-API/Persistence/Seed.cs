using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedDataAsync(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            if (!await roleManager.RoleExistsAsync("Cashier"))
            {
                await roleManager.CreateAsync(new IdentityRole("Cashier"));
            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Chalaka",
                        UserName = "ChalakaRathnayake",
                        Email = "chalakar3@gmail.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }

            if (!context.UserDetails.Any())
            {
                var userDetail = new UserDetail();
                var userCode = "usr" + "cr" + 1 + "0001";

                userDetail.UserCode = userCode;
                userDetail.RoleId = 1;
                userDetail.FirstName = "Chalaka";
                userDetail.LastName = "Rathnayake";
                userDetail.NIC = "920074090V";
                userDetail.CreatedDate = DateTime.Now;

                var loginUser = await userManager.FindByEmailAsync("chalakar3@gmail.com");
                userDetail.CreatedBy = loginUser.Id;
                userDetail.LoggedUserId = loginUser.Id;

                var createUser = await context.UserDetails.AddAsync(userDetail);

                await context.SaveChangesAsync();
            }

            //Email
            if (!context.UserEmails.Any())
            {
                var userDetails = await context.UserDetails.FirstOrDefaultAsync(x => x.NIC == "920074090V");
                await context.UserEmails.AddAsync(new UserEmail
                {
                    UserId = userDetails.Id,
                    Email = "chalakar3@gmail.com"
                });
                await context.SaveChangesAsync();
            }

            //Contact
            if (!context.UserContacts.Any())
            {
                var userDetails = await context.UserDetails.FirstOrDefaultAsync(x => x.NIC == "920074090V");
                await context.UserContacts.AddAsync(new UserContact
                {
                    UserId = userDetails.Id,
                    ContactNo = "0711967116"
                });
                await context.SaveChangesAsync();
            }


            //Address
            if (!context.UserAddresses.Any())
            {
                var userDetails = await context.UserDetails.FirstOrDefaultAsync(x => x.NIC == "920074090V");
                await context.UserAddresses.AddAsync(new UserAddress
                {
                    UserId = userDetails.Id,
                    Address1 = "235/2",
                    DistrictId = 11,
                    ProvinceId = 6
                });
                await context.SaveChangesAsync();
            }

            if (!context.Provinces.Any())
            {
                var provinces = new List<Province>
                {
                    new Province {  Name = "Central" },
                    new Province {  Name = "Eastern" },
                    new Province {  Name = "Northern" },
                    new Province {  Name = "Southern" },
                    new Province {  Name = "Western" },
                    new Province {  Name = "North Western" },
                    new Province {  Name = "North Central" },
                    new Province {  Name = "Uva" },
                    new Province {  Name = "Sabaragamuwa" }
                };

                await context.Provinces.AddRangeAsync(provinces);
                await context.SaveChangesAsync();
            }

            if (!context.Districts.Any())
            {
                var districts = new List<District>
                {
                    new District{ProvinceId=2, Name="Ampara"},
                    new District{ProvinceId=7, Name="Anuradhapura"},
                    new District{ProvinceId=8, Name="Badulla"},
                    new District{ProvinceId=2, Name="Batticaloa"},
                    new District{ProvinceId=5, Name="Colombo"},
                    new District{ProvinceId=4, Name="Galle"},
                    new District{ProvinceId=5, Name="Gampaha"},
                    new District{ProvinceId=4, Name="Hambantota"},
                    new District{ProvinceId=3, Name="Jaffna"},
                    new District{ProvinceId= 5,Name= "Kalutara"},
                    new District{ProvinceId= 1,Name= "Kandy"},
                    new District{ProvinceId= 9,Name= "Kegalle"},
                    new District{ProvinceId= 1,Name= "Kilinochchi"},
                    new District{ProvinceId= 6,Name= "Kurunegala"},
                    new District{ProvinceId= 3,Name= "Mannar"},
                    new District{ProvinceId= 1,Name= "Matale"},
                    new District{ProvinceId= 4,Name= "Matara"},
                    new District{ProvinceId= 8,Name= "Monaragala"},
                    new District{ProvinceId= 3,Name= "Mullaitivu"},
                    new District{ProvinceId= 1,Name= "Nuwara Eliya"},
                    new District{ProvinceId= 7,Name= "Polonnaruwa"},
                    new District{ProvinceId= 6,Name= "Puttalam"},
                    new District{ProvinceId= 9,Name= "Ratnapura"},
                    new District{ProvinceId= 2,Name= "Trincomalee"},
                    new District{ProvinceId= 3,Name= "Vavuniya"}
                };

                await context.Districts.AddRangeAsync(districts);
                await context.SaveChangesAsync();
            }
        }
    }
}