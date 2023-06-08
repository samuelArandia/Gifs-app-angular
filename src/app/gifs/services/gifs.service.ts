import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService{

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:     string = '1v7wRjTHeUjDvr4BjDFFghSdsKfD1CrX'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'


  constructor( private http: HttpClient ) {this.readLocalStorage();}

  // property getter
  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string) {
    tag = tag.toLowerCase();
    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }
    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ) );
  }

  private readLocalStorage():void {
    if ( !localStorage.getItem('history') ) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }


  // metodos
  searchTag ( tag: string ): void {
    if (tag.length === 0) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

      this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
        console.log({gifs: this.gifList});

      })

    // await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.statusText)
    //     }
    //     return response.json();
    //   })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err))
  }

}
