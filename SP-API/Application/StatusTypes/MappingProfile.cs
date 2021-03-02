using AutoMapper;
using Domain;

namespace Application.StatusTypes
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, StatusType>();
        }
    }
}