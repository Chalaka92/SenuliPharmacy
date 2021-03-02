using AutoMapper;
using Domain;

namespace Application.OrderItemBatches
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, OrderItemBatch>();
            CreateMap<OrderItemBatch, OrderItemBatchDto>();
        }
    }
}