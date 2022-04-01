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
  }


  Submit() {
    this.router.navigate(["weather"], {queryParams: {location:this.location}})
    .then(() => {
      window.location.reload();
    });
  }

  

  


}
