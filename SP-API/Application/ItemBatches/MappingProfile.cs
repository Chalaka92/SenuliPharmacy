using AutoMapper;
using Domain;

namespace Application.ItemBatches
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, ItemBatch>();
            CreateMap<ItemBatch, ItemBatchDto>();
        }
    }
}