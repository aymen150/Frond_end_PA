import { Component, OnInit } from '@angular/core';
import {Entreprise} from '../../model/entreprise.model';
import {HttpClient} from '@angular/common/http';
import {StatEntreprise} from '../../model/stat-entreprise.model';
import {StatCompany} from '../../model/stat-company.model';
import {EntrepriseTableService} from '../../services/entreprise-table.service';
import {Router} from '@angular/router';

export interface SentimentEntreprise {
  'company_id': string;
  'n_articles': number;
  'p_positive': number;
  'name': string;
  'period': string;
}
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})

export class TablesComponent implements OnInit {
  public listeStatEntreprise: [StatEntreprise];
  public  listeSentimentEnreprise: [SentimentEntreprise] ;
  public size;
  public cursor;
  public invervalle;
  public data: [SentimentEntreprise];
  public totalRecords: Number;
  public page: Number = 1 ;

  constructor(private http: HttpClient, private router: Router, ) { }

  ngOnInit() {
    this.http.get<StatCompany>('http://localhost:5000/company/getAllGeneralStats')
      .subscribe(value => {
        this.listeStatEntreprise = value.result;
        this.totalRecords = value.result.length;
        console.log('Stat Entreprise  : ok' + this.totalRecords );
      });
    // this.entrepriseSentiment();
  }
  entrepriseSentiment(n_negative: number , n_positives: number): number {
    return Number(((n_positives / (n_negative + n_positives)) * 100).toFixed(0)) ;
  }
  CategorieEntrepriseSentiment(n_negative: number , n_positives: number): number {
    const x = this.entrepriseSentiment(n_negative , n_positives);
    if ( x >= 80) {
      return 1;
    } else if (x < 80 && x >= 60 ) {
      return 2;
    } else if ( x < 60 && x < 40 ) {
      return 3 ;
    } else {
      return 4 ;
    }
  }
  choiceDashboard ( x: Entreprise) {
    localStorage.setItem('entreprise', JSON.stringify(x));
    this.router.navigate(['/dasboard']);
  }
  //
  /**
  pageSuivante(x) {
    if (( x + 5 ) < this.size ) {
      this.cursor = this.cursor + 5 ;
      if ((this.invervalle + 5) < this.size ) {
        this.invervalle = this.invervalle + 5 ;
      } else {
        this.invervalle = this.size ;
      }
    }
  }
  pageprecedante(x) {
    if (( x - 5 ) > 0 ) {
      this.cursor = this.cursor - 5 ;
      if ((this.invervalle - 5) > 0 ) {
        this.invervalle = this.invervalle - 5 ;
      } else {
        this.invervalle = 0 ;
      }
    }
  }
   */
}
