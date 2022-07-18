import { Component } from '@angular/core';
import { Registries } from './models/registry';
import { BinaryService } from './services/binary.service';

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

  constructor(
    private binaryService: BinaryService
  ) { }

  private GetInitialRegistries(): Registries {
    return { AH: '', AL: '', BH: '', BL: '', CH: '', CL: '', DH: '', DL: '' }
  }

  submitInitials() {
    this.initialSubmitted = true;
  }
  updateModel($event: any) {
    let name = $event.target.name as string;
    if(this.regexp.test($event.target.value)) {
      $event.target.style.borderColor = '#ced4da';
      let name = $event.target.name as string;
      this.actualRegistries[name] = $event.target.value;
    } else {
      $event.target.style.borderColor = 'red';
      let name = $event.target.name as string;
      this.actualRegistries[name] = '';
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
      this.binaryService.performMov(this.actualRegistries, this.from, this.to)
    }
    if(this.currentCommand === 'XCHG') {
      this.binaryService.performXchg(this.actualRegistries, this.from, this.to)
    }

    this.from = "";
    this.to = "";
  }
  
  hexAdd(registry:string, value:string) {
    this.binaryService.hexAdd(this.actualRegistries, registry, value);
  }

  hexSubstract(registry:string, value:string) {
    this.binaryService.hexSubstract(this.actualRegistries, registry, value);
  }
  performNot(registry:string, value:string) {
    this.binaryService.performNot(this.actualRegistries, registry, value);
  }

  performNeg(registry:string, value:string) {
    this.binaryService.performNeg(this.actualRegistries, registry, value);
  }

  public performAnd(destination:any, src: MouseEvent) {
    this.binaryService.performAnd(this.actualRegistries, destination, src);
  }

  public performOr(destination:any, src: MouseEvent) {
    this.binaryService.performOr(this.actualRegistries, destination, src);
  }

  public performXOr(destination:any, src: MouseEvent) {
    this.binaryService.performXOr(this.actualRegistries, destination, src);
  }
}
