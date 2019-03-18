import { Component, OnInit, Input } from '@angular/core';
import { ProblemService } from '../problem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.css']
})
export class SubmissionDetailComponent implements OnInit {
  data: any;
  sId: string;

  constructor(private problemService: ProblemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sId = this.route.snapshot.paramMap.get('id');
    this.problemService.getSubmissionDetail(this.sId).subscribe(
      response => {
        this.data = response;
        console.log("data :" + response);
      });
  }

}
