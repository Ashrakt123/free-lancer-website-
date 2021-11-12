import { Component, OnInit } from '@angular/core';
// import { get } from 'http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CatagoriesService } from 'src/app/service/catagories.service';

@Component({
  selector: 'app-home-section3',
  templateUrl: './home-section3.component.html',
  styleUrls: ['./home-section3.component.css']
})
export class HomeSection3Component implements OnInit {

  Categories:any=[];
  constructor(private CategoryService : CatagoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.CategoryService.getAllCatagories().subscribe((res: any) => {
      this.Categories = res;
      // console.log(res);
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
}
