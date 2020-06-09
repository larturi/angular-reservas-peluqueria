import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private data: any;

  constructor(private http: HttpClient) { }

  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/translations/' + navigator.language.substr(0, 2) + '.json').subscribe(data => {
        this.data = data;
        resolve(true);
      }, error => {
        console.log(error);
        reject(true);
      }
      );
    });
  }

  public getTranslate(word: string) {
    return this.data[word];
  }

}
