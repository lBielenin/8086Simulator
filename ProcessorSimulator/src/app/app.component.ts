import { Component } from '@angular/core';
import { Registries } from './models/registry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  instructions = ["MOV", "XCHG", "INC", "DEC", "NEG"]
  //["AND", "OR", "XOR", 
  //"ADD", "SUB"] WYNIK DO PIERWSZEGO REJESTRU
  title = 'ProcessorSimulator';
  registerNamesList = [ "AH", "AL", "BH", "BL", "CH", "CL", "DH", "DL" ];
  initialSubmitted = true;
  from: string = "";
  to: string = "";
  regexp = /^[0-9a-fA-F]{1,2}$/;
  currentCommand = "";
  initialRegistries: Registries = this.GetInitialRegistries()
  actualRegistries: Registries =  this.GetInitialRegistries();
  pickedLeft = "";
  pickedRight = "";
  
  private GetInitialRegistries(): Registries {
    return { AH: "1", AL: "2", BH: "3", BL: "4", CH: "5", CL: "6", DH: "7", DL: "8" }
  }

  submitInitials() {
    console.log(this.initialRegistries);
    console.log(this.actualRegistries);
    this.initialSubmitted = true;
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

  executeCommand() {
    if(this.currentCommand === 'MOV') {
      this.actualRegistries[this.to] = this.actualRegistries[this.from];
    }
    if(this.currentCommand === 'XCHG') {
      let temp = this.actualRegistries[this.from];
      this.actualRegistries[this.from] = this.actualRegistries[this.to];
      this.actualRegistries[this.to] = temp;

    }

    this.from = "";
    this.to = "";
  }
  
}
