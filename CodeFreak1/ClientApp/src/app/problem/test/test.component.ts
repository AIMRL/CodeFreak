

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { DataSource } from '@angular/cdk/collections';

import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs/observable/of';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: DataTableDataSource;

  displayedColumns = ['result', 'score', 'language', 'time'];

  constructor() { }

  ngOnInit() {

    this.dataSource = new DataTableDataSource(this.paginator, this.sort);

  }

}



// TODO: Replace this with your own data model type
export interface DataTableItem {
  result: string;
  score: number;
  language: string;
  time: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  { result: 'success', score: 10, language: "C++", time: '20 Seconds Ago' },
  { result: 'success', score: 10, language: "C++", time: '19 Seconds Ago' },
  { result: 'success', score: 10, language: "C++", time: '18 Seconds Ago' },
  { result: 'success', score: 10, language: "C++", time: '17 Seconds Ago' },
  { result: 'success', score: 10, language: "C++", time: '16 Seconds Ago' },

];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
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
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'result': return compare(a.result, b.result, isAsc);
        case 'score': return compare(+a.score, +b.score, isAsc);
        case 'language': return compare(a.language, b.language, isAsc);
        case 'time': return compare(a.time, b.time, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




