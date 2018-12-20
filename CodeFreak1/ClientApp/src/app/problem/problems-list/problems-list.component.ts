import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';
import { ProblemCompleteViewModel } from '../dtos/problem-complete-view-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.css']
})
export class ProblemsListComponent implements OnInit {
  problems: Array<ProblemCompleteViewModel>;
  constructor(private problemService: ProblemService, private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.problems = new Array<ProblemCompleteViewModel>();
    var diffType = this.route.snapshot.paramMap.get('diffType');
    var probType = this.route.snapshot.paramMap.get('probType');

    this.problemService.getAllProblems().subscribe(res => {
      debugger;
      this.problems = res;
    });
  }

}
