﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Threading.Tasks;

namespace ITPlus.TestTask.Front.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        [HttpGet]
        public async Task<object> Get()
        {
            var data = await System.IO.File.ReadAllTextAsync(Path.Combine(AppContext.BaseDirectory, "data.json"));
            var jobject = JsonConvert.DeserializeObject(data);
            return jobject;
        }

        [HttpPut]
        public async Task<object> Put(object item)
        {
            var newData = item.ToString();
            await System.IO.File.WriteAllTextAsync(Path.Combine(AppContext.BaseDirectory, "data.json"), newData);
            return null;
        }
    }
}
