import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
  
  public weatherData : any;
  //public location!: string;
  errorMessage = "Invalid City"
  invalidCity = false;
  today = new Date();
  location!: string;

  rise_unix = 0;

  

  //location = String(sessionStorage.getItem("city"));
  //location = String(sessionStorage.getItem("city"));
  
  
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  day = this.days[this.today.getDay()];
  month = this.months[this.today.getMonth()];
  year = this.today.getFullYear();
  num = this.today.getDay();
  
  todays = this.day + " " + this.num +" " + this.month;

  sunrise!: string;
  sunset!: string;


  constructor(
    private weatherService : WeatherService,
    private route: ActivatedRoute
  ) { }

  

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.location = params['location'];
      }
    );

    this.weatherService.getWeather(this.location).subscribe(
      data => {
        console.log(this.location);
        this.weatherData = data;
        console.log(this.weatherData);


        this.rise_unix = this.weatherData.sys.sunrise;
        
        this.sunrise = this.formatDate(this.weatherData.sys.sunrise);
        this.sunset = this.formatDate(this.weatherData.sys.sunset);
        
        

        

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

  // APIRequest() {

    

  //   this.weatherService.getWeather(this.location).subscribe(
  //     data => {
  //       console.log(this.location);
  //       this.weatherData = data;
  //       console.log(this.weatherData);
        
  //     },
  //     error => {
  //       this.invalidCity = true;
  //     }
  //   )
  // }

}
