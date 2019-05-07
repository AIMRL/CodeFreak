import { Component, OnInit } from '@angular/core';
import { DifficultyViewModel } from '../difficulty/dtos/difficulty-view-model';
import { ProblemTypeViewModel } from '../problem-type/dtos/problem-type-view-model';
import { DifficultyService } from '../difficulty/difficulty.service';
import { ProblemTypeService } from '../problem-type/problem-type.service';
import { ProgrammingLanguageViewModel } from '../programming-language/dtos/programming-language-view-model';
import { ProgrammingLanguageService } from '../programming-language/programming-language.service';
import { EventViewModel } from '../event/dtos/event-view-model';
import { EventService } from '../event/event.service';

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
  events: Array<EventViewModel>;

  constructor(private diffService: DifficultyService, private probTypeService: ProblemTypeService, private languageService: ProgrammingLanguageService, private eventService: EventService) {

  }
  ngOnInit(): void {
    this.checkLogin();

    this.difficulties = new Array<DifficultyViewModel>();
    this.problemTypes = new Array<ProblemTypeViewModel>();
    this.events = new Array<EventViewModel>();
    
    this.eventService.getPendingEvents().subscribe(res => {
      if (res != null) {
        this.events = res;
      }
    });

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
