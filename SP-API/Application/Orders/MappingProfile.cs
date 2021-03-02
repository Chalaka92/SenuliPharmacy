using AutoMapper;
using Domain;

namespace Application.Orders
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Order>();
            CreateMap<Order, OrderDto>();
        }
    }
}