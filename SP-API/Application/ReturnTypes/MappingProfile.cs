using AutoMapper;
using Domain;

namespace Application.ReturnTypes
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, ReturnType>();
        }
    }
}