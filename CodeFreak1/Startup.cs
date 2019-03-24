using AutoMapper;
using CodeFreak1.Hubs;
using CodeFreak1.Models;
using CodeFreak1.ViewModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System.Text;
using CodeFreak1.Hubs;

namespace CodeFreak1
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
            services.AddMvc(o =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                o.Filters.Add(new AuthorizeFilter(policy));
            }).AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver()).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddSignalR();
            #region token authentication
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(option =>
            {
                option.SaveToken = true;
                option.RequireHttpsMetadata = false;
                option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration.GetConnectionString("BasePath"),
                    ValidIssuer = Configuration.GetConnectionString("BasePath"),
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecureKey"))
                };
            });
            #endregion

            #region Mapper Initializer
            //Mapper. Initilizing the mapper
            Mapper.Initialize(m =>
            {
                m.CreateMap<Users, UsersViewModel>();
                m.CreateMap<UsersViewModel, Users>();

                m.CreateMap<Problem, ProblemViewModel>();
                m.CreateMap<ProblemViewModel, Problem>();

                m.CreateMap<Roles, RolesViewModel>();
                m.CreateMap<RolesViewModel, Roles>();

                m.CreateMap<Permissions, PermissionsViewModel>();
                m.CreateMap<PermissionsViewModel, Permissions>();

                m.CreateMap<Roles, RolesPermissionsViewModel>();
                m.CreateMap<RolesPermissionsViewModel, Roles>();

                m.CreateMap<Users, UserRolesViewModel>();
                m.CreateMap<UserRolesViewModel, Users>();

                m.CreateMap<UserRoles, UserRolesViewModel>();
                m.CreateMap<UserRolesViewModel, UserRoles>();

                m.CreateMap<PermissionsMapping, RolesPermissionsViewModel>();
                m.CreateMap<RolesPermissionsViewModel, PermissionsMapping>();

                m.CreateMap<Difficulty, DifficultyViewModel>();
                m.CreateMap<DifficultyViewModel, Difficulty>();

                m.CreateMap<ProblemType, ProblemTypeViewModel>();
                m.CreateMap<ProblemTypeViewModel, ProblemType>();

                m.CreateMap<ProgrammingLanguageViewModel, ProgrammingLanguage>();
                m.CreateMap<ProgrammingLanguage, ProgrammingLanguageViewModel>();

                m.CreateMap<Submission, SubmissionViewModel>();
                m.CreateMap<SubmissionViewModel, Submission>();

            });
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
            app.UseSignalR(routes =>
            {
                routes.MapHub<MesaageHub>("/chatHub");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}