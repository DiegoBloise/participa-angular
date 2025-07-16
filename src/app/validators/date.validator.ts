import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function endAfterStartValidator(
  startControlName: string,
  minMinutes: number = 30
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent;
    if (!formGroup) return null;

    const startControl = formGroup.get(startControlName);
    const endControl = control;

    const start = startControl?.value ? new Date(startControl.value) : null;
    const end = endControl?.value ? new Date(endControl.value) : null;

    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    const diff = end.getTime() - start.getTime();
    const minDiffMs = minMinutes * 60 * 1000;

    return diff >= minDiffMs ? null : { endTooSoon: true };
  };
}
