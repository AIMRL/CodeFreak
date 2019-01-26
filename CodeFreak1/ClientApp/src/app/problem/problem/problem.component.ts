import { Component, OnInit } from '@angular/core';
import { CodeViewModel } from '../dtos/code-view-model';
import { CompilerResultViewModel } from '../dtos/compiler-result-view-model';
import { ProblemService } from '../problem.service';
import { ProblemCompleteViewModel } from '../dtos/problem-complete-view-model';
import {ProblemUserCodeViewModel} from '../dtos/Problem-user-code-view-model';
import { ActivatedRoute, Route } from '@angular/router';
import {CompilerOutputViewModel} from '../dtos/compiler-output-view-model';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  
  compilerResult: CompilerOutputViewModel;
  btnCompile = false;
  showResult = false;
  problemId: string;
  problemComplete: ProblemCompleteViewModel;
  problemUserCodeModel:ProblemUserCodeViewModel


  text: string = "#include <iostream>\n" +
    "#include <cstdio>\n" +
    "using namespace std;\n" +
    "\n" +
    "int main() {\n" +
    "    printf(\"Hello, World!\");\n" +
    "    return 0;\n" +
    "}\n";
  options: any = { maxLines: 1000, printMargin: false };
  backColor: string = "gray";
  color: string = "red";
  constructor(private problemService: ProblemService, private route: ActivatedRoute,private myroute : Router) {

  }
  ngOnInit() {
    debugger;
    this.compilerResult = new CompilerOutputViewModel();
    this.problemUserCodeModel = new ProblemUserCodeViewModel();
    this.problemComplete = new ProblemCompleteViewModel();
    this.problemUserCodeModel.Code=this.text;
    this.problemId = this.route.snapshot.paramMap.get('id');

    this.problemUserCodeModel.problemId = this.problemId;
   // this.getProblem(this.problemId);


    this.problemService.getProblembyId(this.problemId).subscribe(res => {
      debugger;
      if (res != null) {
        this.problemComplete = res;
      }

    });
  }

  async getProblem(id) {
    var res = await this.problemService.getProblembyId(id).toPromise();
    if (res != null) {
      this.problemComplete = res;
    }
  }


  onChange(code) {
    console.log("new code", code);
  }
  onRuleChange(code) {
    console.log("new code", code);
  }
  

  compile() {


    this.btnCompile = true;
    this.showResult = false;
    this.problemService.compileCode(this.problemUserCodeModel).subscribe(res => {
      debugger;
      if (res.Success) {
        this.compilerResult = res;
        
      } else {
        this.compilerResult.Error = "There is some probem in compiling";
      }
      this.btnCompile = false;
      this.showResult = true;
      //this.data.storage=this.compilerResult;

      this.problemService.storage=this.compilerResult;
      
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "model":JSON.stringify(this.compilerResult)
        }
    };
      this.myroute.navigate(['/result']);
    });

  }
  submitCode() {

  }



}
