import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  public location!: string;

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    if (!this.isLightTheme()){
      document.body.classList.toggle('dark-theme');
    }
  }


  Submit() {
    this.router.navigate(["weather"], {queryParams: {location:this.location}})
    .then(() => {
      window.location.reload();
    });
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
    
    var darkSwitch = localStorage.getItem("darkSwitch");
    if(darkSwitch === "dark") {
      localStorage.setItem("darkSwitch", "light");
      

    }
    else {
      localStorage.setItem("darkSwitch", "dark")
    }
  
    
    
 }
 
 isLightTheme() {
  var darkSwitch = localStorage.getItem("darkSwitch");
  return !(darkSwitch === "dark");
}
  

  


}
