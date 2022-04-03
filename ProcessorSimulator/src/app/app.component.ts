import { Component } from '@angular/core';
import { Registries } from './models/registry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  instructions = ["MOV", "XCHG", "INC", "DEC", "NEG"]
  title = 'ProcessorSimulator';
  registerNamesList = [ "AH", "AL", "BH", "BL", "CH", "CL", "DH", "DL" ];
  from: string = "";
  to: string = "";
  initialSubmitted = false;
  regexp = /^[0-9a-fA-F]{1,2}$/;

  initialRegistries: Registries = this.GetInitialRegistries()
  actualRegistries: Registries =  this.GetInitialRegistries();
  
  private GetInitialRegistries(): Registries {
    return { AH: "", AL: "", BH: "", BL: "", CH: "", CL: "", DH: "", DL: "" }
  }

  submit() {
    console.log(this.actualHasValues());
  }
  updateModel($event: any) {
    console.log($event);
    if(this.regexp.test($event.target.value)) {
      $event.target.style.borderColor = '#ced4da';
      let name = $event.target.name as string;
      this.actualRegistries[name] = $event.target.value;
    } else {
      $event.target.style.borderColor = 'red';

    }

  }

  actualHasValues():boolean {
    for (var key of Object.keys(this.actualRegistries)) {
      if(this.actualRegistries[key].length < 1) {
        return false;
      }
    }
    return true;
  }
  
}
