import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http : HttpClient) { }


  getWeather(location: string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1521ecfac0519d456cdaef8785a13544&units=metric`);
  }

  
}
