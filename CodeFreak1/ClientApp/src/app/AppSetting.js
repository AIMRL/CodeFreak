"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = /** @class */ (function () {
    function AppSettings() {
    }
    AppSettings.baseUrl = 'https://localhost:44312/';
    //Controller Path
    AppSettings.authURl = "/api/Auth/";
    AppSettings.compilerURl = "/api/Compiler/";
    AppSettings.problemURl = "/api/Problem/";
    AppSettings.difficultyURl = "/api/Difficulty/";
    AppSettings.problemTypeURl = "/api/ProblemType/";
    AppSettings.programmingLanguageURl = "/api/ProgrammingLanguage/";
    //Images path
    AppSettings.SignInPath = '../../assets/images/loginback.jpeg';
    AppSettings.Profile_DefaultUser = '../../assets/images/default-user.png';
    AppSettings.submissionURl = "/api/Submission/";
    AppSettings.ProfileURl = "/api/Profile/";
    return AppSettings;
}());
exports.AppSettings = AppSettings;
//# sourceMappingURL=AppSetting.js.map