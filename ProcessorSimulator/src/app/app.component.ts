import { Component } from '@angular/core';
import { Registries } from './models/registry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProcessorSimulator';
  registerNamesList = [ "AH", "AL", "BH", "BL", "CH", "CL", "DH", "DL" ];
  from: string = "";
  to: string = "";

  initialRegistries: Registries = this.GetInitialRegistries()
  actualRegistries: Registries =  this.GetInitialRegistries();
  
  private GetInitialRegistries(): Registries {
    return { AH: "", AL: "", BH: "", BL: "", CH: "", CL: "", DH: "", DL: "" }
  }
}
