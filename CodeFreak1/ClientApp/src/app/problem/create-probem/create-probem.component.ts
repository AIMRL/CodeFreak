import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('inputFile') inputFile;
  @ViewChild('outputFile') outputFile;

  constructor(private diffService: DifficultyService, private probTypeService: ProblemTypeService, private problemService: ProblemService) { }

  ngOnInit() {
    debugger;
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
    //this.languageService.getAllLanguages().subscribe(data => {
    //  debugger;
    //  if (data != null) {
    //    this.languages = data;
    //  }
    //});
  }

  matcher = new TouchedSubmittedErrorStateMatcher();
  descrpitionFormControl= new FormControl('', [
    Validators.required
  ]);

  add() {
    debugger;
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
    debugger;
    this.selected = n;
  }

  addFile() {
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
      //this.files[index].InputFile.push(event.target.files[0]);
      //var file: File;
      //file = event.target.files[0];
      //var reader = new FileReader();
      //var im = this.images.find(s => s.index == idx);
      //reader.onload = (e) => {
      //  im.url = reader.result;
      //}
      //reader.readAsDataURL(event.target.files[0]);
    }
  }
}
