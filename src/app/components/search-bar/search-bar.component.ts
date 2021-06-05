import { HostListener, Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Entreprise {
  Company: string;
  Symbol: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  title = 'Angular Search Using ng2-search-filter';
  searchText: string;
  entreprises: Entreprise[];
  Company: string;
  Symbol: string;
  num = 1 ;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  chargement(x): void {
    if (x.lenght < 1 ) {
      this.entreprises = [];
    } else {
      this.http.get<Entreprise[]>('./assets/data/Nasdaq.json')
        .subscribe((data: Entreprise[]) => {
          this.entreprises = data;
        });
    }
  }

  choice(x: Entreprise): void {
    this.Company = x.Company ;
    this.Symbol = x.Symbol;
    this.entreprises = [];
  }

}

