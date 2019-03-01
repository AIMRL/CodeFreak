"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = /** @class */ (function () {
    function AppSettings() {
    }
<<<<<<< HEAD
    AppSettings.baseUrl = 'https://localhost:44332/';
=======
    AppSettings.baseUrl = 'https://localhost:44312/';
>>>>>>> develop
    //Controller Path
    AppSettings.authURl = "/api/Auth/";
    AppSettings.compilerURl = "/api/Compiler/";
    AppSettings.problemURl = "/api/Problem/";
    AppSettings.difficultyURl = "/api/Difficulty/";
    AppSettings.problemTypeURl = "/api/ProblemType/";
    AppSettings.programmingLanguageURl = "/api/ProgrammingLanguage/";
    //Images path
<<<<<<< HEAD
    AppSettings.SignInPath = '../../assets/images/loginback.jpg';
    AppSettings.logoPath = '../../assets/images/cflogo.png';
=======
    AppSettings.SignInPath = '../../assets/images/loginback.jpeg';
    AppSettings.Profile_DefaultUser = '../../assets/images/default-user.png';
>>>>>>> develop
    AppSettings.submissionURl = "/api/Submission/";
    AppSettings.ProfileURl = "/api/Profile/";
    return AppSettings;
}());
exports.AppSettings = AppSettings;
//# sourceMappingURL=AppSetting.js.map