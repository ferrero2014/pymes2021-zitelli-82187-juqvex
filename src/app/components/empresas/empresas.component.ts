import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  Titulo = 'Empresas';
  Empresas: Empresa[];
  FormEmpresa: FormGroup;
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  submitted = false;
  AccionABMC = 'L';

  constructor(
    private EmpresaService: EmpresaService,
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService
  ) {
    this.Empresas = [];
  }

  ngOnInit() {
    this.FormEmpresa = this.formBuilder.group({
      RazonSocial: ['', [Validators.required, Validators.maxLength(50)]],
      CantidadEmpleados: [0, [Validators.required]],
      FechaFundacion: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          ),
        ],
      ],
    });
  }

  Buscar() {
    this.AccionABMC = 'L';
    this.EmpresaService.get().subscribe(
      (empresas: Empresa[]) => (this.Empresas = empresas)
    );
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormEmpresa.reset();
  }

  Guardar() {
    this.submitted = true;
    if (this.FormEmpresa.errors) {
      return;
    }
    const formCopy = { ...this.FormEmpresa.value };
    const arrFecha = formCopy.FechaFundacion.toString()
      .substr(0, 10)
      .split('/');
    formCopy.FechaFundacion = new Date(
      arrFecha[2],
      arrFecha[1] - 1,
      arrFecha[0]
    ).toISOString();

    if (this.AccionABMC == 'A') {
      this.EmpresaService.post(formCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
    }
  }

  Consultar(item: Empresa) {
    this.AccionABMC = 'C';
    this.FormEmpresa.patchValue(item);
    const arrFecha = item.FechaFundacion.toString().substr(0, 10).split('-');
    this.FormEmpresa.controls.FechaFundacion.patchValue(
      `${arrFecha[2]}/${arrFecha[1]}/${arrFecha[0]}`
    );
  }

  Volver() {
    this.AccionABMC = 'L';
  }
}
