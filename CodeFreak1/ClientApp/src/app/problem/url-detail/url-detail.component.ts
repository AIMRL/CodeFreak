import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-url-detail',
  templateUrl: './url-detail.component.html',
  styleUrls: ['./url-detail.component.css']
})
export class UrlDetailComponent implements OnInit {
  content: string;
  url: string;

  constructor(private problemService: ProblemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('url');
    this.problemService.getUrlDetail(this.url).subscribe(
      response => {
        this.content = response;
        console.log("content :" + response);
      });
  }
}
