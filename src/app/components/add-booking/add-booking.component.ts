import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking';

import * as _ from 'lodash';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddBookingComponent implements OnInit {

  @ViewChild('modalSuccess', {static: false}) modalSuccess;
  @ViewChild('modalExists', {static: false}) modalExists;

  public options: string[] = ['hair-cut', 'hair-coloring', 'hair-washing', 'hair-straightening'];
  public locale: any;
  public today: Date;
  public formBooking: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private modalService: NgbModal
  ) {

    this.today = new Date();

    if (this.today.getMinutes() < 30) {
      this.today.setMinutes(30);
    } else {
      this.today.setHours(this.today.getHours() + 1);
      this.today.setMinutes(0);
    }

    this.today.setSeconds(0);
    this.today.setMilliseconds(0);

    if (navigator.language.substr(0, 2) === 'es') {
      this.locale = {
        firstDayOfWeek: 1,
        dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
        dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
        dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
        monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Borrar'
      };
    } else {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      };
    }

    this.formBooking = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      date: new FormControl(this.today),
      service: new FormControl(this.options[0])
    });

  }

  ngOnInit(): void {
  }

  get name() {
    return this.formBooking.get('name');
  }

  get date() {
    return this.formBooking.get('date');
  }

  get service() {
    return this.formBooking.get('service');
  }

  addBooking() {
    const booking = new Booking(this.formBooking.value);

    this.bookingService.getBookings().subscribe(bookings => {

      const bookingFound = _.find(bookings, b => {
        const date = new Date(b.date);
        const dateNewBooking = new Date(booking.date);
        return date.getTime() === dateNewBooking.getTime();
      });

      if (bookingFound) {
        this.modalService.open(this.modalExists);
      } else {
        this.bookingService.addBooking(booking).subscribe(data => {
          this.modalService.open(this.modalSuccess);
        }, error => {
          console.log(error);
        });
      }

    });


  }

}
