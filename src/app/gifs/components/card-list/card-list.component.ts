import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  @Input()
  public collectionsOfGifs: Gif[] = [];

  constructor() { }

}
