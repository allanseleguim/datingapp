import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideView', [
      state('true', style({ transform: 'translateX(100%)', opacity: 0 })),
      state('false', style({ transform: 'translateX(0)', opacity: 1 })),
      transition(
        '0 => 1',
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ),
      transition(
        '1 => 1',
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ),
    ]),

    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '600ms ease-in',
          style({ transform: 'translateX(0%)', opacity: 1 })
        ),
      ]),

      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public registerToggler(evt) {
    this.registerMode = !this.registerMode;
  }
}
