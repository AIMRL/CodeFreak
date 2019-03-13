import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { CompilerOutputViewModel } from '../../problem/dtos/compiler-output-view-model';
import { ProblemCompleteViewModel } from '../../problem/dtos/problem-complete-view-model';
import { ProblemUserCodeViewModel } from '../../problem/dtos/Problem-user-code-view-model';
import { ProblemService } from '../../problem/problem.service';

@Component({
  selector: 'event-problem-editor',
  templateUrl: './event-problem-editor.component.html',
  styleUrls: ['./event-problem-editor.component.css']
})
export class EventProblemEditorComponent implements OnInit {
  @Input() eventId: number;
  @Input() eventProblemId: string;


  compilerResult: CompilerOutputViewModel;
  btnCompile = false;
  showResult = false;
  problemId: string;
  problemComplete: ProblemCompleteViewModel;
  problemUserCodeModel: ProblemUserCodeViewModel;
  isData = false;

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
  constructor(private problemService: ProblemService, private route: ActivatedRoute, private myroute: Router) {

  }
  ngOnInit() {
    this.compilerResult = new CompilerOutputViewModel();
    this.problemUserCodeModel = new ProblemUserCodeViewModel();
    this.problemUserCodeModel.Code = this.text;

      this.problemId = this.eventProblemId;
      this.problemUserCodeModel.eventId = this.eventId;
      this.problemUserCodeModel.isEvent = true;


    this.problemUserCodeModel.problemId = this.problemId;

    var id = "0E984725-C51C-4BF4-9960-E1C80E27ABA1";
    this.problemService.getProblembyId(this.problemId).subscribe(res => {
      if (!isNullOrUndefined(res)) {
        this.problemComplete = res;
        this.isData = true;
      }

    });
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

      this.problemService.storage = this.compilerResult;

      let navigationExtras: NavigationExtras = {
        queryParams: {
          "model": JSON.stringify(this.compilerResult)
        }
      };
      this.myroute.navigate(['/result']);
    });

  }
  submitCode() {

  }



}
