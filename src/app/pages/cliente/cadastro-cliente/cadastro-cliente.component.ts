import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/Cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent {
  formGroup: FormGroup

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      observacoes: new FormControl('', Validators.required),
      ativo: new FormControl(true)
    })
  }

  ngOnInit(): void {

  }

  cadastrar() {
    const cliente: Cliente = this.formGroup.value;
    this.clienteService.inserir(cliente).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "Cliente cadastrado com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        })
        this.router.navigate(["/cliente"])
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro ao cadastrar cliente!",
        })
      }
    })
  }
}
