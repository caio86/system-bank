import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/Cliente';
import { Conta } from 'src/app/shared/models/Conta';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss']
})
export class CadastroContaComponent implements OnInit {
  editar: boolean;
  formGroup: FormGroup;
  clientes: Cliente[];

  constructor(
    private contaService: ContaService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.editar = false;
    this.clientes = [];
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      numero: new FormControl("", Validators.required),
      agencia: new FormControl("", Validators.required),
      saldo: new FormControl("", Validators.required),
      cliente: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.editar = true;
      this.contaService.pesquisarPorId(id).subscribe(
        cliente => {
          this.formGroup.patchValue(cliente)
        }
      )
    };
    this.listarClientes();
  }

  listarClientes(): void {
    this.clienteService.listar().subscribe(values => {
      this.clientes = values;
    })
  }

  cadastrarConta(conta: Conta): void {
    this.contaService.inserir(conta).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "Conta cadastrada com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        })
        this.router.navigate(["/conta"])
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro ao cadastrar conta!",
        })
      }
    });
  }

  atualizarConta(conta: Conta): void {
    this.contaService.atualizar(conta).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "Conta atualizada com sucesso!",
          showConfirmButton: false,
          timer: 1500,
        })
        this.router.navigate(["/conta"])
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro ao atualizar conta!",
        })
      }
    });
  }

  salvar(): void {
    const conta: Conta = this.formGroup.value
    if (this.editar) {
      this.atualizarConta(conta);
    } else {
      this.cadastrarConta(conta);
    }
  }
}
