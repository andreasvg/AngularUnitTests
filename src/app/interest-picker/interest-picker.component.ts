import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-interest-picker',
  templateUrl: './interest-picker.component.html',
  styleUrls: ['./interest-picker.component.css']
})
export class InterestPickerComponent implements OnInit {
  @Output() interestChanged = new EventEmitter<string>();
  public selectedInterest: string;

  public interests = ['Gaming', 'Movies', 'Music', 'Sport', 'Travel'];
  constructor() { }

  ngOnInit() {
  }

  onChange(): void {
    this.interestChanged.emit(this.selectedInterest);
  }
}
