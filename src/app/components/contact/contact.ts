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
      'sheetName': ['ContactForm'],
      'first_name': ['', [Validators.required]],
      'last_name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'mobile': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]{10}")]],
      'job_profile': [''],
      'company': ['', [Validators.required]],
      'url': [''],
      'city': [''],
      'state': [''],
      'description': ['', Validators.maxLength(32000)],
      'date':[]
    });
  }

  onSubmit() {

    console.log('Your order has been submitted', JSON.stringify(this.contactForm.value));

    if (this.contactForm.valid) {

      this.contactForm.patchValue({sheetName: 'ContactForm', date: new Date().toISOString()});

      const contactFormData = new FormData();

      Object.keys(this.contactForm.value).forEach(key => {
        contactFormData.append(key, this.contactForm.value[key]);
      });

      let url = "https://script.google.com/macros/s/AKfycbw0oZXtBazfRs3NHgmbzj93hYIFg5FEKgurUt6kYhiCzBxwwf4pUiwes5ZnIYTNzW0b/exec";
      
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    };

      this._http.post(url, JSON.stringify(this.contactForm.value), httpOptions).subscribe({
        next: () => { 
          console.log('sucess');
          this.contactForm.reset();
        },
        error: (err: any) => { console.log('error', err) }
      })
      
    }
  }
}
