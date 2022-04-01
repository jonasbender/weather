import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  forecastDays: any;
  today = new Date();
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  num = this.today.getDay();
  

  constructor(
    private http : HttpClient) { }


  getWeather(location: string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1521ecfac0519d456cdaef8785a13544&units=metric`);
  }

  getForecast(lat: string, long: string) {
    return this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon='+ long + '&exclude=current,minutely,alerts&appid=1521ecfac0519d456cdaef8785a13544&units=metric');
  }
  
  }
