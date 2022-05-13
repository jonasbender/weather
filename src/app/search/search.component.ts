import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public location!: string;



  constructor(private router : Router) { }

  ngOnInit(): void {
  }


  Submit() {
    this.router.navigate(["weather"], {queryParams: {location:this.location}})
    .then(() => {
      window.location.reload();
    });
  }

}
