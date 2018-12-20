import { Component, OnInit } from '@angular/core';
import { DifficultyViewModel } from '../difficulty/dtos/difficulty-view-model';
import { ProblemTypeViewModel } from '../problem-type/dtos/problem-type-view-model';
import { DifficultyService } from '../difficulty/difficulty.service';
import { ProblemTypeService } from '../problem-type/problem-type.service';
import { ProgrammingLanguageViewModel } from '../programming-language/dtos/programming-language-view-model';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';

@Component({
  selector: 'app-home',
  styleUrls:['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isAdmin = false;
  isLogin = true;
  difficulties: Array<DifficultyViewModel>;
  problemTypes: Array<ProblemTypeViewModel>;
  languages: Array<ProgrammingLanguageViewModel>;
  constructor(private diffService: DifficultyService, private probTypeService: ProblemTypeService, private languageService: ProgrammingLanguageService) {

  }
  ngOnInit(): void {
    this.checkLogin();

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
  checkLogin() {

    var token = localStorage.getItem("token");
    if (token != null) {
      this.isLogin = true;
    }
  }

}
