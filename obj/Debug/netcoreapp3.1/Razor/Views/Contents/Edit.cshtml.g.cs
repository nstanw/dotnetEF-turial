#pragma checksum "D:\NET\REDSAND\NoteOnline\Views\Contents\Edit.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fdec3c2f62b017809231f0ec701d9a06bce3a867"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Contents_Edit), @"mvc.1.0.view", @"/Views/Contents/Edit.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"fdec3c2f62b017809231f0ec701d9a06bce3a867", @"/Views/Contents/Edit.cshtml")]
    public class Views_Contents_Edit : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<NoteOnline.Models.Content>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "D:\NET\REDSAND\NoteOnline\Views\Contents\Edit.cshtml"
  
    ViewData["Title"] = "Edit";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<h1>Edit</h1>

<h4>Content</h4>
<hr />
<div class=""row"">
    <div class=""col-md-4"">
        <form asp-action=""Edit"">
            <div asp-validation-summary=""ModelOnly"" class=""text-danger""></div>
            <input type=""hidden"" asp-for=""Id"" />
            <div class=""form-group"">
                <label asp-for=""DocumentId"" class=""control-label""></label>
                <input asp-for=""DocumentId"" class=""form-control"" />
                <span asp-validation-for=""DocumentId"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""Url"" class=""control-label""></label>
                <input asp-for=""Url"" class=""form-control"" />
                <span asp-validation-for=""Url"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""NewUrl"" class=""control-label""></label>
                <input asp-for=""NewUrl"" class=""form-control"" />
                <span asp-validation-for=""");
            WriteLiteral(@"NewUrl"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""Note"" class=""control-label""></label>
                <input asp-for=""Note"" class=""form-control"" />
                <span asp-validation-for=""Note"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""Password"" class=""control-label""></label>
                <input asp-for=""Password"" class=""form-control"" />
                <span asp-validation-for=""Password"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""SetPassword"" class=""control-label""></label>
                <input asp-for=""SetPassword"" class=""form-control"" />
                <span asp-validation-for=""SetPassword"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <input type=""submit"" value=""Save"" class=""btn btn-primary"" />
            </");
            WriteLiteral("div>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n<div>\r\n    <a asp-action=\"Index\">Back to List</a>\r\n</div>\r\n\r\n");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n");
#nullable restore
#line 58 "D:\NET\REDSAND\NoteOnline\Views\Contents\Edit.cshtml"
      await Html.RenderPartialAsync("_ValidationScriptsPartial");

#line default
#line hidden
#nullable disable
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<NoteOnline.Models.Content> Html { get; private set; }
    }
}
#pragma warning restore 1591