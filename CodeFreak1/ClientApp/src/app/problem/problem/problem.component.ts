import { Component, OnInit } from '@angular/core';
import { CodeViewModel } from '../dtos/code-view-model';
import { CompilerResultViewModel } from '../dtos/compiler-result-view-model';
import { ProblemService } from '../problem.service';
import { ProblemCompleteViewModel } from '../dtos/problem-complete-view-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  codeModel: CodeViewModel;
  compilerResult: CompilerResultViewModel;
  btnCompile = false;
  showResult = false;
  problemId: string;
  problemComplete: ProblemCompleteViewModel;


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
  constructor(private problemService: ProblemService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    debugger;
    this.compilerResult = new CompilerResultViewModel;
    this.codeModel = new CodeViewModel();
    this.codeModel.Code = this.text;
    this.problemId = this.route.snapshot.paramMap.get('id');
    this.codeModel.ProblemId = this.problemId;

    var id = "0E984725-C51C-4BF4-9960-E1C80E27ABA1";
    this.problemService.getProblembyId(this.problemId).subscribe(res => {
      debugger;
      this.problemComplete = res;
    });
  }

  onChange(code) {
    console.log("new code", code);
  }
  onRuleChange(code) {
    console.log("new code", code);
  }
  

  compile() {
    debugger;
    this.btnCompile = true;
    this.showResult = false;
    this.problemService.compileCode(this.codeModel).subscribe(res => {
      debugger;
      if (res.Success) {
        this.compilerResult = res;
      } else {
        this.compilerResult.Result = "There is some probem in compiling";
      }
      this.btnCompile = false;
      this.showResult = true;
    });

  }
  submitCode() {

  }



}
