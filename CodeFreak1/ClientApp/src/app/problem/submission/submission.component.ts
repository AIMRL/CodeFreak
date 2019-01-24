
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { DataSource } from '@angular/cdk/collections';

import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs/observable/of';

import { SubmissionViewModel } from '../dtos/submission-view-model';
import { ProblemService } from '../problem.service';





@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})

export class SubmissionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ProblemId = "0E984725-C51C-4BF4-9960-E1C80E27ABA1";

  submissionViewModelList: Array<SubmissionViewModel>;
  displayedColumns = ['Status', 'Score', 'SubmissionId', 'SubmissionDateTime'];

  dataSource: DataTableDataSource;

  dataToShow = "true";

  constructor(private problemService: ProblemService) { }

  ngOnInit() { 
    

    
    this.submissionViewModelList = new Array<SubmissionViewModel>();
    this.problemService.getSubmissionOfUser(this.ProblemId).subscribe(res => {


      this.submissionViewModelList = res;
      this.dataSource = new DataTableDataSource(this.submissionViewModelList, this.paginator, this.sort);

      if (this.dataSource.data.length == 0) {
        this.dataToShow = "false";
      }
   

    })
  }


}



export class DataTableDataSource {

  constructor(public data: Array<SubmissionViewModel> , private paginator: MatPaginator, private sort: MatSort) {
   
  }

  
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Array<SubmissionViewModel>> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */

  private getPagedData(data: Array<SubmissionViewModel>) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Array<SubmissionViewModel>) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Status': return compare(a.Status, b.Status, isAsc);
        case 'Score': return compare(+a.Score, +b.Score, isAsc);
        case 'SubmissionId': return compare(a.SubmissionId, b.SubmissionId, isAsc);
        case 'SubmissionDateTime': return compare(a.SubmissionDateTime, b.SubmissionDateTime, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}






