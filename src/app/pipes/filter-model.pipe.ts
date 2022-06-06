import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterModel'
})
export class FilterModelPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultClientes = [];
    for (const producto of value) {
      if (producto.nombre_producto.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultClientes.push(producto);
      }
    }
    return resultClientes;
  }

}
