using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ProductImage;
using Application.Products;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShopController : BaseController
    {
        [HttpGet("{page}/{pageSize}/{minPrice}/{maxPrice}/{selectedCategories}")]
        public async Task<ActionResult<List<Product>>> List(int page, int pageSize, decimal minPrice, decimal maxPrice, string selectedCategories) {
            return await Mediator.Send(new ListDetaled.Query {
                Page = page,
                PageSize = pageSize,
                MinPrice = minPrice,
                MaxPrice = maxPrice,
                SelectedCategories = selectedCategories
            });
        }

        [HttpGet("imageFor/{id}")]
        public async Task<ActionResult<ProductImage>> Image(int id) {
            return await Mediator.Send(new Application.ProductImage.Details.Query {Id = id});
        }

        [HttpGet("details/{id}")]
        public async Task<ActionResult<Product>> Details(int id ){
            return await Mediator.Send(new Application.Products.Details.Query {Id = id});
        }
    }
}