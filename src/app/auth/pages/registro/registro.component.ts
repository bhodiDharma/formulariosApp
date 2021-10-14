import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { emailPattern, nombreApellidoPatter, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre:['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPatter)]],
    email:['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    userName:['', [Validators.required, this.validatorService.noPuedeSerStrider] ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, { 
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  });




  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.required){
      return 'email es obligatorio'
    }else if (errors?.pattern){
      return 'el formato no es correcto'
    } else if(errors?.emailTaken){
      return 'el email ya esta cogido'
    }


    return '';
  }

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Fernando Herrera',
      email: 'test@test.com',
      username: 'fernando_her'
    })
  }

  campoNoValido( campo: string){
    return this.miFormulario.get(campo)?.invalid && 
            this.miFormulario.get(campo)?.touched;
  }


  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.required && 
  //   this.miFormulario.get('email')?.touched;
  // }

  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.pattern && 
  //   this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.emailTaken && 
  //   this.miFormulario.get('email')?.touched;
  // }

  submitFormulario(){
    
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched()
  }


}
