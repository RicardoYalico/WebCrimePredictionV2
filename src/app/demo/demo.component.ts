import {Component, ContentChild, ViewChild, ViewContainerRef} from '@angular/core';
import {PowerBIEmbedModule} from "powerbi-client-angular";
import {NgForOf} from "@angular/common";
import {PowerbiModalComponent} from "../powerbi-modal/powerbi-modal.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    PowerBIEmbedModule,
    NgForOf,
    PowerbiModalComponent,
    FormsModule
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  @ViewChild('powerBiRef') powerBiRef! : PowerbiModalComponent;
  districtInput = 'Pueblo Libre'
  bootstrap: any;
  constructor() {
  }

  addNewComponent(){

    const modalElement = document.getElementById('powerBiModalComponent');
    if (modalElement) {

      console.log("entre")
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
    // this.powerBiRef.createSingleComponent(this.districtInput)

  }



}
