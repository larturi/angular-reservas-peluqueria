import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking.service';
import { IBooking } from 'src/app/interfaces/ibooking';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit {

  public listBookings: IBooking[] = [];
  public loadBookings = false;

  constructor(private bookingService: BookingService,
              private authService: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      this.bookingService.getBookings().subscribe(list => {
        this.listBookings = list;
        this.loadBookings = true;
     });
    } else {
      this.router.navigate(['/add-booking']);
    }

  }



}
