import { Component, ComponentFactoryResolver, ComponentRef, AfterViewInit, Renderer2, OnInit, ViewChild, ViewContainerRef, afterRender } from '@angular/core';
import {ChildComponent} from "../child/child.component";
import {PowerBIEmbedModule} from "powerbi-client-angular";

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [
    PowerBIEmbedModule
  ],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent implements OnInit, AfterViewInit{
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR!: ViewContainerRef;

  index: number = 0;

  componentsReferences: any[] = [];

  constructor(private CFR: ComponentFactoryResolver, private render: Renderer2) {

  }

  createComponent() {

    this.VCR.clear()

    let componentFactory = this.CFR.resolveComponentFactory(ChildComponent);
    let componentRef: ComponentRef<ChildComponent> = this.VCR.createComponent(componentFactory);
    let currentComponent = componentRef.instance;

    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.index;

    // prividing parent Component reference to get access to parent class methods
    currentComponent.compInteraction = this;

    // add reference for newly created component
    this.componentsReferences.push(componentRef);
  }

  remove(index: number) {

    if (this.VCR.length < 1)
      return;

    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    let component: ChildComponent = <ChildComponent>componentRef.instance;

    let vcrIndex: number = this.VCR.indexOf(componentRef)

    // removing component from container
    this.VCR.remove(vcrIndex);

    this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
  }

  protected readonly localStorage = localStorage;
}
