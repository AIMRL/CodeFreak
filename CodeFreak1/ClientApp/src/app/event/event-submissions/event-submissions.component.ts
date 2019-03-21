import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { EventService } from '../event.service';
import { CompleteSubmissionViewModel } from '../../problem/dtos/complete-submission-view-model';

@Component({
  selector: 'event-submissions',
  templateUrl: './event-submissions.component.html',
  styleUrls: ['./event-submissions.component.css']
})
export class EventSubmissionsComponent implements OnInit {

  @Input()
  eventId: number;

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
//  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  submissionViewModelList: Array<CompleteSubmissionViewModel>;

  displayedColumns = ['UserName', 'ProblemName', 'Status', 'Score','DateTime'];
  dataSource: MatTableDataSource<CompleteSubmissionViewModel>;
  pageEvent: PageEvent;
  pageSize = 4;
  pageIndex = 0;
  isData = false;


  dataToShow = "true";
  constructor(private eventService: EventService) { }


  ngOnInit() {
    debugger;
    this.submissionViewModelList = new Array<CompleteSubmissionViewModel>();
    this.eventService.getEventSubmissions(this.eventId).subscribe(res => {
      debugger;
      if (res != null) {
        this.submissionViewModelList = res;
        this.dataSource = new MatTableDataSource(this.submissionViewModelList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isData = true;
      }
    })
  }



  sortData(sort: Sort) {
    debugger;
    const data = this.submissionViewModelList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource<CompleteSubmissionViewModel>(data);
      return;
    }

    this.dataSource = new MatTableDataSource<CompleteSubmissionViewModel>(data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'UserName': return compare(a.User.Name, b.User.Name, isAsc);
        case 'ProblemName': return compare(a.Problem.Title, b.Problem.Title, isAsc);
        case 'Status': return compare(a.Submission.Status, b.Submission.Status, isAsc);
        case 'Score': return compare(a.Submission.Score, b.Submission.Score, isAsc);
        case 'Date Time': return compare(a.Submission.SubmissionDateTime, b.Submission.SubmissionDateTime, isAsc);
        default: return 0;
      }
    }));
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


