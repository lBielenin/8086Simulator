import { Component } from '@angular/core';
import { Registries } from './models/registry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  instructions = ["MOV", "XCHG", "INC/DEC", "NEG", "NOT", "AND",  "OR", "XOR"]
  title = 'ProcessorSimulator';
  registerNamesList = [ "AH", "AL", "BH", "BL", "CH", "CL", "DH", "DL" ];
  initialSubmitted = false;
  from: string = "";
  to: string = "";
  regexp = /^[0-9a-fA-F]{1,2}$/;
  currentCommand = "";
  initialRegistries: Registries = this.GetInitialRegistries()
  actualRegistries: Registries =  this.GetInitialRegistries();

  private GetInitialRegistries(): Registries {
    return { AH: "0", AL: "1", BH: "2", BL: "3", CH: "4", CL: "5", DH: "6", DL: "7" }
  }

  submitInitials() {
    this.initialSubmitted = true;
  }
  updateModel($event: any) {
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
    var parsedHex = parseInt(value, 16).toString(2);
    var parsed = parsedHex.padStart(8, "0");
    var temps = 
    parsed
    .replace(/0/g, 'A')
    .replace(/1/g, 'B')
    .replace(/A/g, '1')
    .replace(/B/g, '0');
    let hexInt = parseInt(temps, 2);
    let hex = hexInt.toString(16);

    return hex;
  }

  public performAdd(destination:any, src: MouseEvent) {
    let trg = <HTMLSpanElement>src.target;
    
    let binaryDest = parseInt(this.actualRegistries[destination], 16).toString(2).padStart(8, "0");
    let binarySrc = parseInt(this.actualRegistries[trg.innerText], 16).toString(2).padStart(8, "0");

    let resultStr = '';
    for (var i = 0; i < binaryDest.length; i++) {
      if(binaryDest.charAt(i) === binarySrc.charAt(i) && binaryDest.charAt(i) === '1') {
        resultStr += '1';
      } else {
        resultStr += '0';
      }
    }
    
    this.actualRegistries[destination] = parseInt(resultStr, 2).toString(16);
  }

  public performOr(destination:any, src: MouseEvent) {
    let trg = <HTMLSpanElement>src.target;
    
    let binaryDest = parseInt(this.actualRegistries[destination], 16).toString(2).padStart(8, "0");
    let binarySrc = parseInt(this.actualRegistries[trg.innerText], 16).toString(2).padStart(8, "0");

    let resultStr = '';
    for (var i = 0; i < binaryDest.length; i++) {
      if(binarySrc.charAt(i) === '1' || binaryDest.charAt(i) === '1') {
        resultStr += '1';
      } else {
        resultStr += '0';
      }
    }
    
    this.actualRegistries[destination] = parseInt(resultStr, 2).toString(16);
  }

  public performXOr(destination:any, src: MouseEvent) {
    let trg = <HTMLSpanElement>src.target;
    
    let binaryDest = parseInt(this.actualRegistries[destination], 16).toString(2).padStart(8, "0");
    let binarySrc = parseInt(this.actualRegistries[trg.innerText], 16).toString(2).padStart(8, "0");

    let resultStr = '';
    for (var i = 0; i < binaryDest.length; i++) {
      if(binarySrc.charAt(i) === binaryDest.charAt(i)) {
        resultStr += '0';
      } else {
        resultStr += '1';
      }
    }
    
    this.actualRegistries[destination] = parseInt(resultStr, 2).toString(16);
  }
}
