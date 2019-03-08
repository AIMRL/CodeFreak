export class AppSettings {

  public static baseUrl: string = 'https://localhost:44387/';

  //Controller Path
  public static authURl: string = `/api/Auth/`; 
  public static compilerURl: string = `/api/Compiler/`;
  public static problemURl: string = `/api/Problem/`;
  public static difficultyURl: string = `/api/Difficulty/`;
  public static problemTypeURl: string = `/api/ProblemType/`; 
  public static programmingLanguageURl: string = `/api/ProgrammingLanguage/`;
  public static eventURl: string = `/api/Event/`; 
  //Images path
  public static SignInPath = '../../assets/images/loginback.jpg';
  public static logoPath = '../../assets/images/cflogo.png';
  public static submissionURl: string = `/api/Submission/`; 
}
