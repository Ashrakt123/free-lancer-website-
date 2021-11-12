import { Component, OnInit } from '@angular/core';
import { CatagoriesService } from 'src/app/service/catagories.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  Categories:any=[];
  constructor(private CategoryServeice : CatagoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.CategoryServeice.getAllCatagories().subscribe((res: any) => {
      this.Categories = res;
      // console.log(res);
    })
  }

}
