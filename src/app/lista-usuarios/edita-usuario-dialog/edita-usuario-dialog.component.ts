import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared.service';

interface Escolaridade {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edita-usuario-dialog',
  templateUrl: './edita-usuario-dialog.component.html',
  styleUrls: ['./edita-usuario-dialog.component.css']
})
export class EditaUsuarioDialog implements OnInit {

  dadosUsuario = {};

  escolaridades: Escolaridade[] = [
    {value: '0', viewValue: 'Infantil'},
    {value: '1', viewValue: 'Fundamental'},
    {value: '2', viewValue: 'Médio'},
    {value: '3', viewValue: 'Superior'}

  ];

  ehEdicao = false;

  public formulario!: FormGroup;

  maxDate: Date;
  

  constructor(
    private _service: SharedService,
    private _formBuider: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditaUsuarioDialog>,
    @Inject(MAT_DIALOG_DATA) 
    public data: {
      UsuarioId: string,
      Nome: string,
      Sobrenome: string,
      Email: string,
      DtNascimento: string,
      Escolaridade: string
    }) {

      if(this.data.UsuarioId)
      {
        this.dadosUsuario = {
          UsuarioId : this.data.UsuarioId,
          Nome : this.data.Nome,
          Sobrenome : this.data.Sobrenome,
          Email : this.data.Email,
          DtNascimento : this.data.DtNascimento,
          Escolaridade : this.data.Escolaridade
        }
        this.ehEdicao = true;
      }

      this.maxDate = new Date();
    }

  ngOnInit(): void {

    this.configuraFormulario();
    if (this.ehEdicao){
      this.setarDadosFormulario();
    }

    
  }

  configuraFormulario(): void {
    this.formulario = this._formBuider.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dtNascimento: ['', [Validators.required]],
      escolaridade: ['', [Validators.required]]

    })
  }

  setarDadosFormulario(): void {
    this.formulario.patchValue({
      nome: this.data.Nome,
      sobrenome: this.data.Sobrenome,
      email: this.data.Email,
      dtNascimento: this.data.DtNascimento,
      escolaridade: this.data.Escolaridade.toString()
    })
  }

  salvarUsuario():void{
    if(this.formulario.valid) {
      var val = {
        Nome: this.formulario.get('nome')?.value,
        Sobrenome: this.formulario.get('sobrenome')?.value,
        Email: this.formulario.get('email')?.value,
        DtNascimento: this.formulario.get('dtNascimento')?.value,
        Escolaridade: this.formulario.get('escolaridade')?.value,
      }

      this._service.adicionaUsuario(val).subscribe(res=> {
        this._snackBar.open(res.status,'Fechar');
        this.dialogRef.close();
      })
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  atualizarUsuario():void{
    if(this.formulario.valid) {
      var val = {
        UsuarioId: this.data.UsuarioId,
        Nome: this.formulario.get('nome')?.value,
        Sobrenome: this.formulario.get('sobrenome')?.value,
        Email: this.formulario.get('email')?.value,
        DtNascimento: this.formulario.get('dtNascimento')?.value,
        Escolaridade: this.formulario.get('escolaridade')?.value,

      }

      this._service.atualizaUsuario(val).subscribe(res=> {
        this._snackBar.open(res.status, 'Fechar');
        this.dialogRef.close();
      })
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }
  
  verificaValidacoesForm(
    formGroup: FormGroup | FormArray
  ): void {
      Object.keys(formGroup.controls).forEach((campo) => {
          const controle = formGroup.get(campo);
          if (controle === null) {
              throw new Error(`Controle ${controle} não localizado`);
          }
          controle.markAsDirty();
          controle.markAsTouched();
          if (
              controle instanceof FormGroup ||
              controle instanceof FormArray
          ) {
              this.verificaValidacoesForm(controle);
          }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

