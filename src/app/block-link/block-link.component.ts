import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-block-link',
  templateUrl: './block-link.component.html',
  styleUrls: ['./block-link.component.css']
})
export class BlockLinkComponent implements OnInit {
  @Input() hero: Hero;
  public highlighted: boolean;

  constructor() { }

  ngOnInit() {
  }

/*   @HostListener('mouseenter', ['$event.type'])
  @HostListener('mouseleave', ['$event.type']) */
  setHighlight(event: Event): void {
    this.highlighted = event.type === 'mouseenter';
  }

}
