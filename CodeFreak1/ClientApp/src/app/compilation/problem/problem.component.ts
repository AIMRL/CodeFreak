import { Component, OnInit } from '@angular/core';
import { CodeViewModel } from '../dtos/code-view-model';
import { CompilerResultViewModel } from '../dtos/compiler-result-view-model';
import { CompilationService } from '../compilation.service';

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
  constructor(private compileService: CompilationService) {

  }
  ngOnInit() {
    this.compilerResult = new CompilerResultViewModel;
    this.codeModel = new CodeViewModel();
    this.codeModel.Code = this.text;
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
    this.compileService.compileCode(this.codeModel).subscribe(res => {
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
