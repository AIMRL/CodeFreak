"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var CodeFreakHeaders = /** @class */ (function () {
    function CodeFreakHeaders() {
    }
    CodeFreakHeaders.GetSimpleHeader = function () {
        var headers = new http_1.HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        var httpOptions = {
            headers: headers
        };
        return httpOptions;
    };
    CodeFreakHeaders.GetBearerHeader = function () {
        var headers = new http_1.HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', "bearer " + localStorage.getItem('token'));
        var httpOption = {
            headers: headers
        };
        return httpOption;
    };
    return CodeFreakHeaders;
}());
exports.CodeFreakHeaders = CodeFreakHeaders;
//# sourceMappingURL=CodeFreakHeaders.js.map