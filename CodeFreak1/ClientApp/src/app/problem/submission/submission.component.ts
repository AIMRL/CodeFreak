
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { CompleteSubmissionViewModel } from '../../problem/dtos/complete-submission-view-model';
import { AppSettings } from '../../AppSetting';
import { Observable, Subscription, interval } from 'rxjs';
import { ProblemService } from '../problem.service';
import { SubmissionViewModel } from '../dtos/submission-view-model';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  logoPath = AppSettings.logoPath;
  profilesUrl = AppSettings.UserImagesBaseUrl;



  @Input()
  problemId: string;

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
//  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  submissionViewModelList: Array<SubmissionViewModel>;
  displayedColumns = ['Status', 'Score', 'SubmissionDateTime'];
  dataSource: MatTableDataSource<SubmissionViewModel>;
  pageEvent: PageEvent;
  pageSize = 4;
  pageIndex = 0;
  isData = false;


  dataToShow = "true";
  constructor(private problemService: ProblemService) { }


  ngOnInit() {
    this.submissionViewModelList = new Array<SubmissionViewModel>();
    this.getSubmissions(this.problemId);

  }
  getSubmissions(problemId: string) {
    this.problemService.getSubmissionOfUser(problemId).subscribe(res => {
      if (res != null) {
        this.submissionViewModelList = res;
        this.dataSource = new MatTableDataSource(this.submissionViewModelList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isData = true;
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.submissionViewModelList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource<SubmissionViewModel>(data);
      return;
    }

    this.dataSource = new MatTableDataSource<SubmissionViewModel>(data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Status': return compare(a.Status, b.Status, isAsc);
        case 'Score': return compare(a.Score, b.Score, isAsc);
        case 'SubmissionId': return compare(a.SubmissionId, b.SubmissionId, isAsc);
        case 'SubmissionDateTime': return compare(a.SubmissionDateTime, b.SubmissionDateTime, isAsc);
        default: return 0;
      }
    }));
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


