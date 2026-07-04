import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm!: FormGroup;
  private _http = inject(HttpClient);

  constructor(
    private _formBuilder: FormBuilder,
    // private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this.contactForm = this._formBuilder.group({
      'oid': ['00D5j00000DqLwg'],
      'retURL': ["https://kaushal-portfolio-ejj078hvs-kaushal-brahmbhatt.vercel.app"],
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'mobile': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
      '00N5j00000TrnOR': [''],
      'company': ['', [Validators.required]],
      'url': [''],
      'city': [''],
      'state': [''],
      'description': ['', Validators.maxLength(32000)]
    });
  }

  onSubmit() {

    console.log('Your order has been submitted', JSON.stringify(this.contactForm.value));

    if (this.contactForm.valid) {
      let url = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D5j00000DqLwg";
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      this._http.post(url, JSON.stringify(this.contactForm.value), httpOptions).subscribe({
        next: () => { console.log('sucess') },
        error: (err: any) => { console.log('error', err) }
      })
      this.contactForm.reset();
    }
  }
}
