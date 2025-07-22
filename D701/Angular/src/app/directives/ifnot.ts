import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[appIfNot]',
  standalone: true
})
export class IfNotDirective {
  constructor(private templateRef: TemplateRef<any>, private vcr: ViewContainerRef) {}

  @Input() set appIfNot(condition: boolean) {
    this.vcr.clear();
    if (!condition) {
      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}
