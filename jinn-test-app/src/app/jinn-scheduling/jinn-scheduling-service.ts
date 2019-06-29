import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENVIRONMENT } from '../../environments/environment';
import { Router } from '@angular/router';
import { FacilityLocation, TeammateSchedule } from './jinn-scheduling.component';

@Injectable({
    providedIn: 'root'
})

export class SchedulingService {
    private _serviceApiUrl: string = ENVIRONMENT.rootUrls.Schedule + "api/";
    constructor(private _http: HttpClient) {
    }

    getLocations(): Promise<FacilityLocation[]> {
        return this._http.get(this._serviceApiUrl + 'Locations/').toPromise()
            .then((result: any) => {
                return result.data;
            });
    }

    getScheduleForLocation(locationID: string, date: number): Promise<TeammateSchedule[]> {
        return this._http.get(this._serviceApiUrl + 'Schedules/' + locationID + '/' + date + '/').toPromise()
            .then((result: any) => {
                return result.data;
            });
    }
}