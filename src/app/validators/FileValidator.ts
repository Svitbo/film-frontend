import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    return file && file instanceof File && file.size > 0 ? null : { required: true };
  };
}
