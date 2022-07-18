import { Injectable } from '@angular/core';
import { Registries } from '../models/registry';

@Injectable({
  providedIn: 'root'
})
export class BinaryService {

  constructor() { }
  
  performMov(registries: Registries, from: string, to: string) {
    registries[to] = registries[from];
  }
  performXchg(registries: Registries, from: string, to: string) {
    let temp = registries[from];
    registries[from] = registries[to];
    registries[to] = temp;
  }

  hexAdd(registries: Registries, registry:string, value:string) {
    let number = parseInt(value, 16);
    if(number + 1 > 255) {
      number = 0;
    } else { number++ }
    registries[registry] = number.toString(16);
  }

  hexSubstract(registries: Registries, registry:string, value:string) {
    let number = parseInt(value, 16);
    if(number - 1 < 0) {
      number = 255;
    } else { number-- }
    registries[registry] = number.toString(16);
  }
  performNot(registries: Registries, registry:string, value:string) {
    registries[registry] = this.getNot(registries, value);
  }

  performNeg(registries: Registries, registry:string, value:string) {
    let val = this.getNot(registries, value);
    this.hexAdd(registries, registry,val);
  }

  private getNot(registries: Registries, value:string):string {
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

  public performAnd(registries: Registries, destination:any, src: MouseEvent) {
    let trg = <HTMLSpanElement>src.target;
    
    let binaryDest = parseInt(registries[destination], 16).toString(2).padStart(8, "0");
    let binarySrc = parseInt(registries[trg.innerText], 16).toString(2).padStart(8, "0");

    let resultStr = '';
    for (var i = 0; i < binaryDest.length; i++) {
      if(binaryDest.charAt(i) === binarySrc.charAt(i) && binaryDest.charAt(i) === '1') {
        resultStr += '1';
      } else {
        resultStr += '0';
      }
    }
    
    registries[destination] = parseInt(resultStr, 2).toString(16);
  }

  public performOr(registries: Registries, destination:any, src: MouseEvent) {
    let trg = <HTMLSpanElement>src.target;
    
    let binaryDest = parseInt(registries[destination], 16).toString(2).padStart(8, "0");
    let binarySrc = parseInt(registries[trg.innerText], 16).toString(2).padStart(8, "0");

    let resultStr = '';
    for (var i = 0; i < binaryDest.length; i++) {
      if(binarySrc.charAt(i) === '1' || binaryDest.charAt(i) === '1') {
        resultStr += '1';
      } else {
        resultStr += '0';
      }
    }
    
    registries[destination] = parseInt(resultStr, 2).toString(16);
  }

  public performXOr(registries: Registries, destination:any, src: MouseEvent) {
    let trg = <HTMLSpanElement>src.target;
    
    let binaryDest = parseInt(registries[destination], 16).toString(2).padStart(8, "0");
    let binarySrc = parseInt(registries[trg.innerText], 16).toString(2).padStart(8, "0");

    let resultStr = '';
    for (var i = 0; i < binaryDest.length; i++) {
      if(binarySrc.charAt(i) === binaryDest.charAt(i)) {
        resultStr += '0';
      } else {
        resultStr += '1';
      }
    }
    
    registries[destination] = parseInt(resultStr, 2).toString(16);
  }
}
