using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Orders;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<string>> Create([FromBody] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPut("Complete/{id}")]
        public async Task<ActionResult<Unit>> Complete(int id, Complete.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPut("Cancel/{id}")]
        public async Task<ActionResult<Unit>> Cancel(int id, Cancel.Command command)
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