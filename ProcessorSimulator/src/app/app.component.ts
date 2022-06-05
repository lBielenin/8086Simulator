import { Component } from '@angular/core';
import { Registries } from './models/registry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  instructions = ["MOV", "XCHG", "INC/DEC", "NEG", "NOT"]
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
  // Trzeba zrobic takie same instrukcje rowniez dla pamieci 080522 
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
  
  hexAdd(registry:string, value:string) {
    let number = parseInt(value, 16);
    if(number + 1 > 255) {
      number = 0;
    } else { number++ }
    this.actualRegistries[registry] = number.toString(16);
  }

  hexSubstract(registry:string, value:string) {
    let number = parseInt(value, 16);
    if(number - 1 < 0) {
      number = 255;
    } else { number-- }
    this.actualRegistries[registry] = number.toString(16);
  }
  performNot(registry:string, value:string) {
    this.actualRegistries[registry] = this.getNot(value);
  }

  performNeg(registry:string, value:string) {
    let val = this.getNot(value);
    this.hexAdd(registry,val);
  }

  private getNot(value:string):string {
    let paddint = 8 - value.length; 
    var parsed = parseInt(value, 10).toString(2).padStart(paddint, "0");
    var temps = 
    parsed
    .replace(/0/g, 'A')
    .replace(/1/g, 'B')
    .replace(/A/g, '1')
    .replace(/B/g, '0');
    let hex = parseInt(temps, 2).toString(16);

    return hex;
  }
}
