using AutoMapper;
using Domain;

namespace Application.ItemCategories
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, ItemCategory>();
        }
    }
}