import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Conta } from 'src/app/shared/models/Conta';
import { Transferencia } from 'src/app/shared/models/Transferencia';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia-conta',
  templateUrl: './transferencia-conta.component.html',
  styleUrls: ['./transferencia-conta.component.scss']
})
export class TransferenciaContaComponent implements OnInit {
  formGroup: FormGroup
  contas: Conta[]

  constructor(
    private contaService: ContaService,
    private clienteService: ClienteService,
    private router: Router,
  ) {
    this.contas = []
    this.formGroup = new FormGroup({
      conta_origem: new FormControl("", Validators.required),
      conta_destino: new FormControl("", Validators.required),
      valor: new FormControl("", Validators.required),
    })
  }

  ngOnInit(): void {
    this.listarContas();
  }

  listarContas(): void {
    this.contaService.listar().subscribe(contas => {
      this.clienteService.listar().subscribe(clientes => {
        const contasComNomesDeClientes = contas.map(conta => {
          const cliente = clientes.find(cliente => cliente.id == conta.cliente)
          if (cliente) {
            conta.nomeCliente = cliente.nome;
          }
          return conta;
        })
        this.contas = contasComNomesDeClientes;
      });
    })
  }

  cadastrar() {
    const transferencia: Transferencia = this.formGroup.value;
    this.contaService.transferencia(transferencia).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Sucesso",
          text: "Transferência registrada com sucesso!",
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
          text: "Erro ao registrar transferência!",
        })
      }
    })
  }
}
