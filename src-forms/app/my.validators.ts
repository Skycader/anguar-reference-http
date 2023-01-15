import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class MyValidators {
  static restrictedEmails(control: FormControl): { [key: string]: boolean } {
    if (['v@ya.ru', 'test@gmail.com'].includes(control.value)) {
      return {
        restrictedEmail: true,
      };
    }
    return null;
  }

  static uniqueEmail(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === "async@gmail.com") {
          resolve({uniqueEmail: true})
        } else {
          resolve(null)
        }
      },3000)
    })
  }
}
