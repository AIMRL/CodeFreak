import { Component, OnInit } from '@angular/core';
import { ProblemViewModel } from '../dtos/problem-view-model';
import { FormControl, Validators } from '@angular/forms';
import { TouchedSubmittedErrorStateMatcher } from '../../Angular Material/touched-submitted-error-state-matcher';

@Component({
  selector: 'app-create-probem',
  templateUrl: './create-probem.component.html',
  styleUrls: ['./create-probem.component.css']
})
export class CreateProbemComponent implements OnInit {
  problem: ProblemViewModel;
  constructor() { }

  ngOnInit() {
    this.problem = new ProblemViewModel();
  }

  matcher = new TouchedSubmittedErrorStateMatcher();
  descrpitionFormControl= new FormControl('', [
    Validators.required
  ]);

  add() {
    debugger;
  }

}
