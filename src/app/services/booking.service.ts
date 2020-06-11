import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Booking } from '../models/booking';
import { IBooking } from '../interfaces/ibooking';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookings(): Observable<IBooking[]> {
    const headers = new HttpHeaders();
    headers.set('Content-type', 'aplication/json');

    const url = 'https://bookingapp-5456d.firebaseio.com/bookings.json';

    return this.http.get<IBooking[]>(url, {headers}).pipe(
        map( data => {
           let bookings = [];

           if (data) {

            const today = new Date();

            _.forEach(_.keys(data), key => {
                 const booking = new Booking(data[key]);
                 const bookingDate = new Date(booking.date);

                 if (bookingDate.getTime() >= today.getTime()) {
                   bookings.push(booking);
                 }
              });
           }
           bookings = _.orderBy(bookings, b => b.date);
           return bookings;
        })
    );
  }

  addBooking(booking: Booking) {
     const headers = new HttpHeaders();
     headers.set('Content-type', 'aplication/json');

     const url = 'https://bookingapp-5456d.firebaseio.com/bookings.json';

     const body = JSON.stringify(booking.getData());

     return this.http.post(url, body, {headers});
  }
}
