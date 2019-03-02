import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ProblemViewModel } from '../dtos/problem-view-model';
import { FormControl, Validators } from '@angular/forms';
import { TouchedSubmittedErrorStateMatcher } from '../../Angular Material/touched-submitted-error-state-matcher';
import { DifficultyService } from '../../difficulty/difficulty.service';
import { ProblemTypeService } from '../../problem-type/problem-type.service';
import { ProblemService } from '../problem.service';
import { DifficultyViewModel } from '../../difficulty/dtos/difficulty-view-model';
import { ProblemTypeViewModel } from '../../problem-type/dtos/problem-type-view-model';
import { ProgrammingLanguageViewModel } from '../../programming-language/dtos/programming-language-view-model';
import { ProgrammingLanguageService } from '../../programming-language/programming-language.service';
import { EditorialViewModel } from '../dtos/editorial-view-model';
import { ProblemTestCaseViewModel } from '../dtos/problem-test-case-view-model';
import { AddProblemViewModel } from '../dtos/add-problem-view-model';
import { ToastService } from '../../toast/toast.service';
import { Router } from '@angular/router';
import { EventService } from '../../event/event.service';
import { EventProblemsViewModel } from '../../event/dtos/event-problems-view-model';

@Component({
  selector: 'app-create-probem',
  templateUrl: './create-probem.component.html',
  styleUrls: ['./create-probem.component.css']
})
export class CreateProbemComponent implements OnInit {
  selected: number =0;
  code = "";
  problem: ProblemViewModel;
  editorial: EditorialViewModel;
  files: Array<ProblemTestCaseViewModel>;
  difficulties: Array<DifficultyViewModel>;
  problemTypes: Array<ProblemTypeViewModel>;
  languages: Array<ProgrammingLanguageViewModel>;
  createProblem: AddProblemViewModel;
  @ViewChild('inputFile') inputFile;
  @ViewChild('outputFile') outputFile;

  @Input() 
  eventId: number;
  @Output() outProblem = new EventEmitter<ProblemViewModel>();
  isEventProblem = false;

  constructor(private toastService: ToastService, private router: Router, private diffService: DifficultyService,
    private probTypeService: ProblemTypeService, private problemService: ProblemService,
    private languageService: ProgrammingLanguageService, private eventService: EventService) { }

  ngOnInit() {
    debugger;
    if (this.eventId != null && this.eventId != undefined) {
      this.isEventProblem = true;
    }

    this.createProblem = new AddProblemViewModel();
    this.problem = new ProblemViewModel();
    this.editorial = new EditorialViewModel();
    this.files = new Array<ProblemTestCaseViewModel>();
    this.difficulties = new Array<DifficultyViewModel>();
    this.problemTypes = new Array<ProblemTypeViewModel>();

    this.diffService.getAllDifficulties().subscribe(data => {
      if (data != null) {
        this.difficulties = data;
      }
    });
    this.probTypeService.getAllProblemTypes().subscribe(data => {
      if (data != null) {
        this.problemTypes = data;
      }
    });
    this.languageService.getAllLanguages().subscribe(data => {
      debugger;
      if (data != null) {
        this.languages = data;
      }
    });
  }

  matcher = new TouchedSubmittedErrorStateMatcher();
  descrpitionFormControl= new FormControl('', [
    Validators.required
  ]);
  showAlertMessage(caption, message) {
    this.toastService.makeWarning(caption, message);
  }
  add() {
    debugger;
    if (!this.validateForm()) { return; }
    if (this.isEventProblem) {
      this.problem.IsPublic = false;
    } else {
      this.problem.IsPublic = true;
    }
    this.createProblem.Editorial = this.editorial;
    this.createProblem.Problem = this.problem;
    this.createProblem.TestFiles = this.files;
    this.problemService.addProblem(this.createProblem).subscribe(res => {
      debugger;
      if (res == null || res == undefined) {
        this.toastService.makeError("UnAuthorize", "Server is not accessible");
        return;
      }
      if (!res.Success) {
        this.toastService.makeError(res.Message, res.Message);
        return;
      }
      this.toastService.makeSuccess("Problem Successfully added", res.Message);
      this.createProblem = new AddProblemViewModel();
      this.problem = new ProblemViewModel();
      this.editorial = new EditorialViewModel();
      this.files = new Array<ProblemTestCaseViewModel>();  
      if (!this.isEventProblem) {
        this.router.navigate(['problem', res.ProblemId]);
        return;
      }
      //if problem is added by an event
      var eventProblem = new EventProblemsViewModel();
      eventProblem.EventId = this.eventId;
      eventProblem.ProblemId = res.ProblemId;
      this.eventService.addEventProblem(eventProblem).subscribe(eveProbResult => {
        if (eveProbResult == null || !eveProbResult.Success) {
          this.showAlertMessage("Partial successful", "Add Problem from existing Problem");
          return;
        }
        this.toastService.makeSuccess("Problem Successfully added", "Problem is added in event");
        
        this.outProblem.emit(res);
        return;
      });
    });
  }
  validateForm() {
    var status = true;
    if (this.problem.DifficultyId == undefined) {
      this.showAlertMessage("Difficulty Name is missing", "Please select difficult value");
      status = false;
    }
    if (this.problem.ProblemTypeId == undefined) {
      this.showAlertMessage("Problem Type Name is missing", "Please select problem type value");
      status = false;
    }
    if (this.problem.Description== undefined) {
      this.showAlertMessage("Problem description is missing", "provide problem explainatio in word editor");
      status = false;
    }
    for (var i = 0; i < this.files.length; i++) {
      if (this.files[i].InputFile == undefined || this.files[i].InputFile == null) {
        this.showAlertMessage("Input file is missing","select input file of Row "+(i+1));
        status = false;
      }
      if (this.files[i].outFile == undefined || this.files[i].outFile == null) {
        this.showAlertMessage("Output file is missing", "select output file of Row " + (i + 1));
        status = false;
      }
    }
    return status;
  }
  previousTab() {
    this.selected = this.selected - 1;
    if (this.selected < 0) {
      this.selected = 0;
      return
    }
  }
  nextTab() {
    this.selected = this.selected + 1;
    if (this.selected > 3) {
      this.selected = 3;
      return;
    }
  }
  setSelected(n) {
    this.selected = n;
  }
  addFile() {
    debugger;
    var testCase: ProblemTestCaseViewModel;
    testCase = new ProblemTestCaseViewModel();
    this.files.push(testCase);
  }
  deleteRow(index) {
    debugger;
    this.files.splice(index, 1);
  }
  readUrl(event, index,status) {
    debugger;
    if (event.target.files && event.target.files[0]) {
      if (status==0) {
        this.files[index].InputFile = event.target.files[0];
        this.files[index].InputFilePath = event.target.files[0].name;
      }
      else if (status == 1) {
        this.files[index].outFile = event.target.files[0];
        this.files[index].OutputFilePath = event.target.files[0].name;
      }
    }
  }
}
