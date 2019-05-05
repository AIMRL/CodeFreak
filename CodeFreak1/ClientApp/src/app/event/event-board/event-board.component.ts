import { Component, OnInit,OnDestroy, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { EventService } from '../event.service';
import { AppSettings } from '../../AppSetting';
import { EventUserViewModel } from '../dtos/event-user-view-model';
import { Observable, Subscription, interval } from 'rxjs';
import { EventPerformanceViewModel } from '../dtos/event-performance-view-model';

@Component({
  selector: 'event-board',
  templateUrl: './event-board.component.html',
  styleUrls: ['./event-board.component.css']
})
export class EventBoardComponent implements OnInit, OnDestroy {

  logoPath = AppSettings.logoPath;
  profilesUrl = AppSettings.UserImagesBaseUrl;
  eventUser: EventUserViewModel;
  isSCD = true;
  isESD = false;
  interval: Observable<number>;
  subcription: Subscription;


  @Input()
  eventId: number;

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  //  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data: Array<EventPerformanceViewModel>;

  displayedColumns = ['Image','UserName', 'TotalSubmission', 'Score'];
  dataSource: MatTableDataSource<EventPerformanceViewModel>;
  pageEvent: PageEvent;
  pageSize = 4;
  pageIndex = 0;
  isData = false;


  dataToShow = "true";
  constructor(private eventService: EventService) { }


  ngOnInit() {
    debugger;
    this.data = new Array<EventPerformanceViewModel>();
    this.getEventBoardResult(this.eventId);

    //getting event
    this.eventService.getEventById(this.eventId).subscribe(res => {
      if (res != null) {
        var st = new Date(res.Event.StartDateTime);
        st.setMinutes(st.getMinutes() - st.getTimezoneOffset());
        res.Event.StartDateTime = new Date(st);

        var en = new Date(res.Event.EndDateTime);
        en.setMinutes(en.getMinutes() - en.getTimezoneOffset());
        res.Event.EndDateTime = new Date(en);

        this.eventUser = res;

        this.interval = interval(8000);
        this.subcription = this.interval.subscribe((x) => {
          if ((new Date(Date.now())) > this.eventUser.Event.StartDateTime && (new Date(Date.now())) < this.eventUser.Event.EndDateTime) {
            this.getEventBoardResult(this.eventId);
          } else {
            this.unsubscribeInterval(this.subcription);
          }
        })

      }
    });
    //ending event getting

  }
  ngOnDestroy() {
    this.unsubscribeInterval(this.subcription);
  }
  unsubscribeInterval(interval: Subscription) {
    interval.unsubscribe();
  }
  getEventBoardResult(eventId: number) {
    debugger;
    this.eventService.getEventBoardResult(eventId).subscribe(res => {
      debugger;
      if (res != null) {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isData = true;
      }
    });
  }

  sortData(sort: Sort) {
    debugger;
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = new MatTableDataSource<EventPerformanceViewModel>(data);
      return;
    }

    this.dataSource = new MatTableDataSource<EventPerformanceViewModel>(data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'UserName': return compare(a.User.Name, b.User.Name, isAsc);
        case 'Score': return compare(a.TotalScore, b.TotalScore, isAsc);
        case 'TotalSubmission': return compare(a.NoOfSubmissions, b.NoOfSubmissions, isAsc);
        default: return 0;
      }
    }));
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


