import { TestBed } from '@angular/core/testing';

import { CargaArchivosService } from './carga-archivos.service';

describe('CargaArchivosService', () => {
  let service: CargaArchivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaArchivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
