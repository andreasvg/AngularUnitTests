import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  public noDataFound: boolean;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.noDataFound = false;
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        if (heroes.length > 0) {
          this.noDataFound = false;
          this.heroes = heroes;
        } else {
          this.noDataFound = true;
        }
      });
  }

  add(name: string): void {
    name = name.trim();
    const strength = 11;
    if (!name) { return; }
    this.heroService.addHero({ name, strength } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    console.log('about to call heroService');
    this.heroService.deleteHero(hero).subscribe();
  }

}
