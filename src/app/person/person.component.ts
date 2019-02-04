import { Component, OnInit, Input } from '@angular/core';
import { Person } from './person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input() person: Person;
  public greeting: string;

  constructor() { }

  ngOnInit() {
    this.greeting = `Good day to you ${this.person.firstName}!`;
  }

}
