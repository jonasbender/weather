import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../service/weather.service';


export class Day {
  constructor(
    public day_of_week: string
  ) {

  }
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
  
  public weatherData : any;
  public forecastData : any;
  //public location!: string;
  errorMessage = "Invalid City! Please try again."
  rainForecast = true;
  invalidCity = false;
  today = new Date();
  location!: string;

  rise_unix = 0;

  maxTemp : number = 0;
  minTemp : number = 100;

  

  

  //location = String(sessionStorage.getItem("city"));
  //location = String(sessionStorage.getItem("city"));
  
  
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  day = this.days[this.today.getDay()];
  month = this.months[this.today.getMonth()];
  year = this.today.getFullYear();
  num = this.today.getDay();
  hour = this.today.getHours();
  dayOfMonth = this.today.getDate();

  forecastDays! : Day[];

  daily : any[] = [1,2,3,4,5,6,7];

  hourly : any[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24]
  
  
  

  lat! : any;
  long! : any;
  
  todays = this.day + " " + this.dayOfMonth +" " + this.month;

  sunrise!: string;
  sunset!: string;


  constructor(
    private weatherService : WeatherService,
    private route: ActivatedRoute, 
    private router : Router
  ) { }

  

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.location = params['location'];
      }
    );


    this.weatherService.getWeather(this.location).subscribe(
      data => {
        console.log(this.location);
        this.weatherData = data;
        console.log(this.weatherData);

        
        this.sunrise = this.formatDate(this.weatherData.sys.sunrise);
        this.sunset = this.formatDate(this.weatherData.sys.sunset);

        this.lat = this.weatherData.coord.lat;
        this.long = this.weatherData.coord.lon;

        console.log(this.lat);
        console.log(this.long);

        this.weatherService.getForecast(this.lat, this.long).subscribe(
          data => {
            this.forecastData = data;
            console.log(this.forecastData);
            
          }
          
        )

      },
      error => {
        this.invalidCity = true;
      }
    )

    

  }


  formatDate(s: number) {
    const a = new Date(s * 1000);
    return a.toLocaleTimeString("en-GB", {hour: '2-digit', minute: '2-digit'});
  }

  countDays(i : number) {
    return this.days[(i + this.num) % 7];
  }

  countHours(i : number) {
    if(this.hour + i > 23)
      return this.hour + i-24;
    return i + this.hour;
  }

  rainCheck(k : number) {
    if(this.forecastData.hourly[k].pop == 0)
      return false; 
    else return true;
  }

  maxTempCalc() {
    for(let i=0; i<7; i++){
      this.maxTemp = Math.max(this.forecastData.daily[i+1].temp.max.toFixed(0), this.maxTemp);
    }
    return this.maxTemp;
  }

  minTempCalc() {
    for(let i=0; i<7; i++){
      this.minTemp = Math.min(this.forecastData.daily[i+1].temp.min.toFixed(0), this.minTemp);
    }
    return this.minTemp;
  }

  barwidth() {
    return (this.maxTempCalc() - this.minTempCalc());
  }

  width(i: string | number) {
    return (((this.forecastData.daily[i].temp.max.toFixed(0) - this.forecastData.daily[i].temp.min.toFixed(0)) / this.barwidth())*100);
  }

  margin(i: string | number){
    return (((this.forecastData.daily[i].temp.min.toFixed(0) - this.minTempCalc()) / this.barwidth())*100)
  }


  

}
