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
  p: number = 1;
  problems: Array<ProblemCompleteViewModel>;
  diffType: string;
  probType: string;
  which: string;
  constructor(private problemService: ProblemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.problems = new Array<ProblemCompleteViewModel>();
    this.which = this.route.snapshot.paramMap.get('which');
    if(this.which != null) {
      if (this.which == '1') {
        this.probType = this.route.snapshot.paramMap.get('name');
      }
      if (this.which == '2') {
        this.diffType = this.route.snapshot.paramMap.get('name');
      }
    }



    this.problemService.getAllProblems().subscribe(res => {
      this.problems = res;
      if (this.diffType != null) {
        this.problems = this.problems.filter(p => p.Difficulty.Name.includes(this.diffType));
      }
      if (this.probType != null) {
        this.problems=this.problems.filter(p => p.ProblemType.Name == this.probType);
      }
    });
  }

}
