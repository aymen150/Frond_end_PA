import { HostListener, Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
// import {Entreprise} from '../../model/entreprise.model';
import { Observable } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../model/article.model';
import {Entreprise} from '../../model/entreprise.model';

export interface Company {
    result: [Entreprise];
}


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  title = 'Angular Search Using ng2-search-filter';
  id: string ;
  searchText: string;
  entreprises: Entreprise[];
  Company: string;
  Symbol: string;
  listeArticle: [Article];
  size;
  //
  constructor(private http: HttpClient, private articleService: ArticleService) {}
  ngOnInit(): void {}
  //
  chargement(x): void {
      let params = new HttpParams();
      params = params.append('name', x);
      this.http.get<Company>('http://localhost:5000/company/get-companies-by-name', { params: params})
        .subscribe(value => {
          this.entreprises = value.result;
          console.log('value ! : ' + value);
        });

  }

    choice ( x: Entreprise) {
    this.id =  x.company_id  ;
    this.Company = x.name;
    this.Symbol = x.symbol;
    localStorage.setItem('entreprise', JSON.stringify(x));
    this.entreprises = [] ;
    this.searchText = '' ;
    }
  //
  //
}

