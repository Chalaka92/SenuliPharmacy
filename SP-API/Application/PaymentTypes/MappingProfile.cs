using AutoMapper;
using Domain;

namespace Application.PaymentTypes
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, PaymentType>();
        }
    }
}