using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ItemBatches;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ItemBatchController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<ItemBatchDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("ListByPagination")]
        public async Task<ActionResult<ListByPagination.ItemBatchEnvelope>> ListByPagination(int? limit,
           int? offset)
        {
            return await Mediator.Send(new ListByPagination.Query(limit,
                offset));
        }

        [HttpGet("ListByItemId/{itemId}")]
        public async Task<ActionResult<List<ItemBatchDto>>> ListByItemId(int itemId)
        {
            return await Mediator.Send(new ListByItemId.Query { ItemId = itemId });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemBatchDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}