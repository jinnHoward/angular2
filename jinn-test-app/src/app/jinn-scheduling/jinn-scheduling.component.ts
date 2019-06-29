import { Component, OnInit, ViewChild } from '@angular/core';
import { SchedulingService } from './jinn-scheduling-service';
import { ENVIRONMENT } from 'src/environments/environment.prod';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';

@Component({
  selector: 'jinn-scheduling',
  templateUrl: './jinn-scheduling.component.html',
  styleUrls: ['./jinn-scheduling.component.scss']
})

export class JinnSchedulingComponent implements OnInit {
  facilityLocations: FacilityLocation[];
  selectedLocation: string;
  selectedDate: string;
  schedules: TeammateSchedule[];
  isValid: boolean = false;
  displayedColumns: string[] = ["teammateName", "teammateType", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  dataSource: MatTableDataSource<TeammateSchedule>;
  showHasFullCoverageWarning:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _scheduleService: SchedulingService) {
    this.dataSource = new MatTableDataSource<TeammateSchedule>();
  }

  ngOnInit() {
    this.schedules = [];
    this._scheduleService.getLocations().then(
      (result) => { this.facilityLocations = result; },
      (error) => { console.log(error); }
    )
  }
  getSchedules() {
    let day: number = this.getWeekStartDay(new Date(this.selectedDate))
    this._scheduleService.getScheduleForLocation(this.selectedLocation, day).then(
      (result) => {
        this.schedules = result;
        this.dataSource = new MatTableDataSource(this.schedules);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => { console.log(error); }
    );
  }

  getWeekStartDay(selectedDate: Date): number {
    var day = selectedDate.getDay() || 7;
    if (day !== 1)
      selectedDate.setHours(-24 * (day - 1));
    return Date.parse(selectedDate.toString());
  }

  mondayFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day === 1;
  }

  hasFullCoverage(dayOfWeek: number) {
    let hasFullCoverage: boolean = false;
    let numScheduled: number = 0;
    for (let i = 0; i < this.schedules.length; i++) {
      const row = this.schedules[i];
      if (row.teammateType === 'Anesthesia') {
        let isScheduled: boolean = this.getIsScheduled(row, dayOfWeek);
        if (isScheduled === true) {
          numScheduled++;
          if (numScheduled > 1) {
            hasFullCoverage = true;
            break;
          }
        }
      }
    }
    if(hasFullCoverage === false)
      this.showHasFullCoverageWarning = true;
    return hasFullCoverage;
  }

  getIsScheduled(row: TeammateSchedule, dayOfWeek: number): boolean {
    let isScheduled: boolean = false;
    switch (dayOfWeek) {
      case 1:
        isScheduled = (row.monday != 'OFF')
        break;
      case 2:
        isScheduled = (row.tuesday != 'OFF')
        break;
      case 3:
        isScheduled = (row.wednesday != 'OFF')
        break;
      case 4:
        isScheduled = (row.thursday != 'OFF')
        break;
      case 5:
        isScheduled = (row.friday != 'OFF')
        break;
      case 6:
        isScheduled = (row.saturday != 'OFF')
        break;
      case 0:
        isScheduled = (row.sunday != 'OFF')
        break;
      default:
        break;
    }
    return isScheduled;
  }

}

export interface FacilityLocation {
  facilityId: string,
  facilityName: string
}

export interface TeammateSchedule {
  teammateName: string,
  teammateType: string,
  monday: string,
  tuesday: string,
  wednesday: string,
  thursday: string,
  friday: string,
  saturday: string,
  sunday: string,
}
