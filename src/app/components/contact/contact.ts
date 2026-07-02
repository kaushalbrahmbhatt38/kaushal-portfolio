import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient
  ){}

  ngOnInit(): void {
    this.contactForm = this._formBuilder.group({
      'oid':['00D5j00000DqLwg'],
      'retURL':["https://kaushalbrahmbhatt38.github.io/Kaushal-Portfolio/"],
      'first_name':['', [Validators.required]],
      'last_name':['', [Validators.required]],
      'email':['', [Validators.required, Validators.email]],
      'mobile':['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
      '00N5j00000TrnOR':[''],
      'company':['',[Validators.required]],
      'url':['',[Validators.required]],
      'city':[''],
      'state':[''],
      'description':['']
    });
  }

  onSubmit() {
    
    // console.warn('Your order has been submitted', this.contactForm.value);

    // if(this.contactForm.valid){
    //   let url = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D5j00000DqLwg";
    //   let httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     })
    //   };
    //   this._http.post(url, this.contactForm.value,httpOptions);
    //   this.contactForm.reset();
    // }
  }
}
