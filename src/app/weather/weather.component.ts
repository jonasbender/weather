import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  //location = String(sessionStorage.getItem("city"));
  //location = String(sessionStorage.getItem("city"));
  location!: string;
  
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  day = this.days[this.today.getDay()];
  month = this.months[this.today.getMonth()];
  year = this.today.getFullYear();
  num = this.today.getDay();
  
  todays = this.day + " " + this.num +" " + this.month;


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
        
      },
      error => {
        this.invalidCity = true;
      }
    )

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
