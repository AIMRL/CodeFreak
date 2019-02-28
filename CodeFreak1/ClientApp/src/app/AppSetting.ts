export class AppSettings {
  public static baseUrl: string = 'https://localhost:44312/';

  //Controller Path
  public static authURl: string = `/api/Auth/`; 
  public static compilerURl: string = `/api/Compiler/`;
  public static problemURl: string = `/api/Problem/`;
  public static difficultyURl: string = `/api/Difficulty/`;
  public static problemTypeURl: string = `/api/ProblemType/`; 
  public static programmingLanguageURl: string = `/api/ProgrammingLanguage/`; 
  //Images path
  public static SignInPath = '../../assets/images/loginback.jpeg';
  public static Profile_DefaultUser = '../../assets/images/default-user.png';
  public static submissionURl: string = `/api/Submission/`;

  public static ProfileURl: string = `/api/Profile/`;
  
}
