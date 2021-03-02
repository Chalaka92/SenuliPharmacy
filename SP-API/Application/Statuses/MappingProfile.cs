using AutoMapper;
using Domain;

namespace Application.Statuses
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Status>();
            CreateMap<Status, StatusDto>();
        }
    }
}