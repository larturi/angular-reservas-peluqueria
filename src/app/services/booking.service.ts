import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  addBooking(booking: Booking) {
     const headers = new HttpHeaders();
     headers.set('Content-type', 'aplication/json');

     const url = 'https://bookingapp-5456d.firebaseio.com/bookings.json';

     const body = JSON.stringify(booking.getData());

     return this.http.post(url, body, {headers});
  }
}
