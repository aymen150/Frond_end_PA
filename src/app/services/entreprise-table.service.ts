import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StatEntreprise} from '../model/stat-entreprise.model';
import {StatCompany} from '../model/stat-company.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseTableService {
  listeEntreprise: [StatEntreprise];
  baseUrl = 'http://localhost:5000/company/getAllGeneralStats';
  constructor(private http: HttpClient) { }

  getStatCompany(chargeur): void {
    this.http.get<StatCompany>(this.baseUrl)
      .subscribe(value => {
        chargeur = value.result;
        console.log('Stat Entreprise  : ok' + this.listeEntreprise );
      });
  }
}
