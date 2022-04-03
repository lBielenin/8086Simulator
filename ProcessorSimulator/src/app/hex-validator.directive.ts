import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


@Directive({
  selector: '[appHexValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: HexValidatorDirective,
      multi: true
    }
  ]
})
export class HexValidatorDirective implements Validator{
  regexp = /^[0-9a-fA-F]+$/;


  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    if(!this.regexp.test(control.value)){
      console.log('not valid');
      return { isHex: false }
    }
    console.log('valid');
    return null;
  }

}
