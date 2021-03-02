using AutoMapper;
using Domain;

namespace Application.Provinces
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Province>();
        }
    }
}