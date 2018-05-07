using Microsoft.AspNetCore.Mvc;
using QUANLYBANHANG.Models;

namespace QUANLYBANHANG.Controllers
{
    public class getRoomPayLoadController : Controller
    {
        private readonly AccessContext _context;
        public getRoomPayLoadController(AccessContext context)
        {
            _context = context;
        }
    }
}