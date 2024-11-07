import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appNotImage]',
  standalone: true
})
export class NotImageDirective {

  constructor(private element: ElementRef) { }

  @HostListener('error')
  onError(): void {
    this.element.nativeElement.src = 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='
  }

}
