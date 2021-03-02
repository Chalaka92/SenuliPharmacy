using AutoMapper;
using Domain;

namespace Application.UserDetails
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, UserDetail>();
            CreateMap<UserDetail, UserDetailDto>();
            CreateMap<UserAddress, UserAddressDto>();
            CreateMap<UserContact, UserContactDto>();
            CreateMap<UserEmail, UserEmailDto>();
        }
    }
}