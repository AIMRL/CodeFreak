import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CompilerOutputViewModel} from "../dtos/compiler-output-view-model";
import {ProblemService} from "../problem.service";
import { SubmissionProblemTestCaseViewModel } from '../dtos/submission-problem-testcase-view-model';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  displayedColumns: string[] = ['index','status'];
  dataSource: Array<SubmissionProblemTestCaseViewModel>;
  private compilerResult:CompilerOutputViewModel;

  constructor(private route : ActivatedRoute,private data :ProblemService) {
    this.compilerResult=data.storage;
    this.dataSource=this.compilerResult.TestcasesResult;
   }

  ngOnInit() {
   
  }

}
