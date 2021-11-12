import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {NgForm} from "@angular/forms";
import { environment } from 'src/environments/environment';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { Subscription } from 'rxjs';
import { take, map, tap, delay, switchMap, filter } from 'rxjs/operators';
import {paymentService } from '../../service/payment.service'
import { PurposalService } from 'src/app/service/purposal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ProjectService } from 'src/app/service/project.service';
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { Purposal } from 'src/app/_models/purposal';




@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  //purposal:Purposal=new Purposal();
  purposal: any = [];
 user: any = [];
  project: any = [];
  data:string="done";

  @ViewChild('cardInfo', { static: false }) cardInfo? : ElementRef;
  title = 'stripeAngular';

  //Declare dummy data
  id:string=this.route.snapshot.params.id;
  name: string = 'krkr';
  email: string = 'ashraktamin@gmail.com';
  currency: string = 'gbp';
  description: string = 'ashrakt and taha ammmmar';
  paymentIntentSub: Subscription=new  Subscription();
  price:any;
 
  stripe:any;
  loading = false;
  confirmation:any;
  clSecret:string="";

  card: any;
  cardHandler = this.onChange.bind(this);
  error:any;

  constructor(
    private cd: ChangeDetectorRef,
    private paymentService: paymentService,
    private purposalservice:  PurposalService,
    private router: Router,
    private stripeService:AngularStripeService,
    private route: ActivatedRoute,
    private userservice: UserService,
    private ProjectService: ProjectService,
    ) {}

  
  


  ngAfterViewInit() {
    const stripePubKey = environment.publishableKeyStripe;
    this.stripeService.setPublishableKey(stripePubKey).then(
      stripe=> {
        this.stripe = stripe;
    const elements = stripe.elements();    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo?.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    });
  }

  
  onChange(error:any) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
          this.purposalservice.getPurposal(this.route.snapshot.params.id).subscribe( res => {
          this.purposal=res;
            console.log(this.purposal);

          this.ProjectService.getProject(  this.purposal.project_id).subscribe(res => {
          this.project = res;
          this.project.status='done';
            console.log(this.project.status);
        
          this.ProjectService
           .updateProject(this.purposal.project_id, this.project)
           .subscribe((res) => {
            console.log( "project id:" +this.purposal.project_id);

           }); 
          }); 
          this.userservice.getUser(this.purposal.developer_id).subscribe(res => {
          this.user.developer_id=res;
            console.log( this.user.developer_id);
          this.project.developer_id=this.purposal.developer_id;
          this.price= this.purposal.budget;
          this.id=this.route.snapshot.params.id;
            console.log(this.price);console.log( this.project.developer_id);
      });
    });
         const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
             console.log('Error:', error);
    } else {
      
             console.log('Success!', token);
      await this.onClickStripe(form);
      this.ProjectService
      .updateProject(this.route.snapshot.params.id, this.project)
      .subscribe((res) => {
     
      })
    }
  }

  onClickStripe(form: NgForm) {
   
    return this.paymentIntentSub = this.paymentService.addPaymentIntentStripe(
      this.id,
      this.name,
      this.email,
      this.price,
      this.currency,
      this.description
    ).pipe(
      switchMap(intent => {
        this.clSecret = intent.intent.client_secret;

        return this.paymentService.storePaymentIntent( 
         
          this.id, 
          this.name,
          this.email,
          this.price,
          this.currency,
          this.description,
          intent.intent.id    
        );
      })      
    ).subscribe(() => {
      this.stripe.confirmCardPayment(this.clSecret, {
        receipt_email: this.email,
          payment_method: {
            card: this.card,
            billing_details: {
              name: this.name,
              email: this.email
            }
          }
      }).then((res: any)=> {
        console.log(res);
        if(res.paymentIntent && res.paymentIntent.status === "succeeded") {
          alert('your payment was successful :$'+ this.price);
        
         console.log(this.project.status);
          form.reset();
          this.router.navigate(['/home']);
        } else {
          const errorCode = res.error.message;
          alert(errorCode);
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.paymentIntentSub) {
      this.paymentIntentSub.unsubscribe();      
    }
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }



  ngOnInit(): void {
    this.purposalservice.getPurposal(this.route.snapshot.params.id).subscribe( res => {
      this.purposal=res;
          console.log(this.purposal);
          this.price= this.purposal.budget;
          this.id=this.route.snapshot.params.id;

      /*    this.ProjectService.getProject(this.route.snapshot.params.id).subscribe(res => {
            this.project = res;
         
        });*/
        
      });
        
        }
      
      
    
  
  
  }
