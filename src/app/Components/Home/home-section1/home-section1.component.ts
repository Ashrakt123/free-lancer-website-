import { Component, OnInit } from '@angular/core';
import { CatagoriesService } from 'src/app/service/catagories.service';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-home-section1',
  templateUrl: './home-section1.component.html',
  styleUrls: ['./home-section1.component.css']
})
export class HomeSection1Component implements OnInit {
  searchName:String="";
  Categories : Category = new Category();
  category_id :any;
  CategoryList : any = [];
  categoryValue = null;
  location=null;
  changeRate(evant:any){
    this.category_id = evant.value;
    this.Categories.id = this.category_id;
    console.log(this.Categories.id);
  }
  constructor(private CategoryServeice : CatagoriesService) { }

  btnStyle(clickedBtn:any , unclickedBtn:any){
    clickedBtn.classList.add("btnClikcedStyle");
    unclickedBtn.classList.remove("btnClikcedStyle");
  }
  getCategories() {
    this.CategoryServeice.getAllCatagories().subscribe((res: any) => {
      this.Categories = res;
      this.CategoryList = this.Categories
      
    })
  }

  submit(){
    console.log('done');
    console.log(this.categoryValue , " " , this.location);
  }
  ngOnInit(): void {
    this.getCategories();
  }

}
