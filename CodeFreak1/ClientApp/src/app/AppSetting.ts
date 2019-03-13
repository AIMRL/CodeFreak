export class AppSettings {

  public static baseUrl: string = 'https://localhost:44380/';


  //Controller Path
  public static authURl: string = `/api/Auth/`; 
  public static compilerURl: string = `/api/Compiler/`;
  public static problemURl: string = `/api/Problem/`;
  public static difficultyURl: string = `/api/Difficulty/`;
  public static problemTypeURl: string = `/api/ProblemType/`; 
  public static chatURL: string = `/api/Chat/`; 

  public static programmingLanguageURl: string = `/api/ProgrammingLanguage/`; 
  //Images path
  public static SignInPath = '../../assets/images/loginback.jpg';
  public static logoPath = '../../assets/images/cflogo.png';
  public static submissionURl: string = `/api/Submission/`; 
}
