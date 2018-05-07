using System;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QUANLYBANHANG.Models;
using QUANLYBANHANG.Models.CustomEntity;

namespace QUANLYBANHANG.Controllers
{
    public class HomeController : Controller
    {
        private readonly AccessContext _context;
        public HomeController(AccessContext context)
        {
           _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
