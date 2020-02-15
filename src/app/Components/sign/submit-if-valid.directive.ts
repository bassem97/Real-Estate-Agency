import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[tsSubmitIfValid]'
})
export class SubmitIfValidDirective {
  @Output('tsSubmitIfValid') valid = new EventEmitter<void>(); // tslint:disable-line:no-output-rename

  constructor(private formRef: NgForm) {
  }

  @HostListener('click')
  handleClick() {
    this.markFieldsAsDirty();
    this.emitIfValid();
  }

  private markFieldsAsDirty() {
    Object.keys(this.formRef.controls)
      .forEach(fieldName =>
        this.formRef.controls[fieldName].markAsDirty()
      );
  }

  private emitIfValid() {
    if (this.formRef.valid) {
      this.valid.emit();
    }
  }
}
