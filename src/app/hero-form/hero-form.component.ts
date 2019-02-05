import { Component, OnInit } from '@angular/core';
import { Person } from '../person/person';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  public person: Person;

  constructor() { }

  ngOnInit() {
    this.person = new Person();
  }

}
