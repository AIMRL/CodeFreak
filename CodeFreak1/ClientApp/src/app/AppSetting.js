"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = /** @class */ (function () {
    function AppSettings() {
    }
    AppSettings.baseUrl = 'https://localhost:44332/';
    //Controller Path
    AppSettings.authURl = "/api/Auth/";
    AppSettings.compilerURl = "/api/Compiler/";
    AppSettings.difficultyURl = "/api/Difficulty/";
    AppSettings.problemTypeURl = "/api/ProblemType/";
    //Images path
    AppSettings.SignInPath = '../../assets/images/loginback.jpeg';
    return AppSettings;
}());
exports.AppSettings = AppSettings;
//# sourceMappingURL=AppSetting.js.map