import { AbstractControl } from "@angular/forms";

export function passwordChecking(formGroup : AbstractControl) : {[key : string]: boolean} | null {
    let password= formGroup.get('password');
    let confirmPassword= formGroup.get('confirmPassword');
    
    if (password?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ noMatch: true })
    } else {
        confirmPassword?.setErrors(null);
    }

    return null;
}