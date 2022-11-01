using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using noteOnlineV01.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace noteOnlineV01
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //var cs = "Host=localhost;Username=postgres;Password=1;Database=noteonl";

            //using var con = new NpgsqlConnection(cs);

            //var sql = "SELECT version()";

            //using var cmd = new NpgsqlCommand(sql, con);

            //var version = cmd.ExecuteScalar().ToString();
            //Console.WriteLine($"PostgreSQL version: {version}");

            NpgsqlConnectionStringBuilder sb = new NpgsqlConnectionStringBuilder();
            sb.Host = "localhost";
            sb.Database = "noteonl";
            sb.Username = "postgres";
            sb.Password = "1";
            NpgsqlConnection conn = new NpgsqlConnection(sb.ConnectionString);

            services.AddDbContext<ContentContext>(options => options.UseNpgsql(conn));
            conn.Open();
            services.AddHealthChecks();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
