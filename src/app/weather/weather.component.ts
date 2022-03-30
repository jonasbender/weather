import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
  public weatherSearchForm!: FormGroup;
  public weatherData : any;
  public location!: string;


  constructor(
    private weatherService : WeatherService,
  ) { }

  ngOnInit(): void {}

  APIRequest() {
    this.weatherService.getWeather(location).subscribe(
      data => {
        this.weatherData = data;
        console.log(this.weatherData);
      }
    )
  }

}
