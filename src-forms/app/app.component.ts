import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { MyValidators } from './my.validators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('',[
      Validators.email,
      Validators.required,
      MyValidators.restrictedEmails,
      
    ],
    [
      MyValidators.uniqueEmail
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ]),
    address: new FormGroup({
      country: new FormControl('by', [
        Validators.required
      ]),
      capital: new FormControl('',[
        Validators.required
      ])
    }),
    skills: new FormArray([])

  })

 
  ngOnInit() {
  }

  getControls(name: string):any {
    return (this.form.get(name) as FormGroup).controls
  }

  setCapital() {
    const cityMap: {[key: string]:string} = {
      ru: 'Москва',
      by: 'Минск',
      ua: 'Киев'
    }
    const cityKey = this.form.get('address').get('country').value
    const capital = cityMap[cityKey]

    this.form.patchValue({address: {capital: capital}})
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.form.get('skills')).push(control)
  }

  submit() {
    console.log(this.form)
    console.log("submit event", this.form.value)
    this.form.reset()
  }
}

