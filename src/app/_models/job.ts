export class Client {
    constructor  (public id:number=0,public name:string="" ,public description:string="" ,
    public rate:number=0, public budget:number=0 ,public final_price:number=0 ,public location:string="" ,
    public status:string="" ,  public craeted_at:Date , public update_at:Date){}
}
