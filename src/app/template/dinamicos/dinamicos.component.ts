import { Component, OnInit } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[];

}
interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

  persona: Persona = {
    nombre: 'fernando',
    favoritos: [
      { id: 1, nombre: 'Metal Gear'},
      { id: 2, nombre: 'Deatth Stranding'}
    ]
  }

  nuevoJuego: string = '';

  guardar() {
    console.log('Formulario Posetado')
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1)
  }

  agregarJuego() {

    if(this.nuevoJuego){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }


    this.persona.favoritos.push( {...nuevoFavorito} )
    this.nuevoJuego = '';
  }
  }
}
