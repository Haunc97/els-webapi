import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: 'input[autoFocusNext]'
})
export class AutoFocusNextDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event: Event) {
        // let element;

        // if (event.code !== 'Backspace')
        //     if (event.target.value.length >= event.target.maxLength)
        //         element = event.srcElement.nextElementSibling;

        // if (event.code === 'Backspace') {

        // }

        // if (element == null)
        //     return;
        // else
        //     element.focus();
        
        // Get the current value of the input element
        let value = (event.target as HTMLInputElement).value;
        // Get the maximum length of the input element
        let maxLength = (event.target as HTMLInputElement).maxLength;
        // Check if the value has reached its maximum length
        if (value.length === maxLength) {
            // Get a reference to the host element
            let hostElement = this.el.nativeElement;
            // Get a reference to the next input element
            let nextInputElement = hostElement.nextElementSibling as HTMLInputElement;
            // If there is a next input element, focus on it
            if (nextInputElement) {
                nextInputElement.focus();
            }
        }
    }
}