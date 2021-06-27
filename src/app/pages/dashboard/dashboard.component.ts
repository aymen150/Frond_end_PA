import {Component, OnInit, Input, Injectable, Inject} from '@angular/core';
import Chart from 'chart.js';
import { DOCUMENT } from '@angular/common';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1 ,
  chartExample2 ,
  chartExample3
} from '../../variables/charts';
import {User} from '../../model/user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Article} from '../../model/article.model';
import {ArticleService} from '../../services/article.service';
import {BourseService} from '../../services/bourse.service';
import {Graphe2} from '../../model/graphe2.model';
import {Entreprise} from '../../model/entreprise.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Inject(DOCUMENT)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class DashboardComponent implements OnInit {

  // @ts-ignore
  public dashboardCompany ;
  public actionMean: number ;
  public actionVariance: number;
  public sentimentPositiveMean: number;
  public augArticleMois  ; // ( Math.abs( ((this.nbArticleMois * 100 ) / this.nbArticleMois) - 100)).toFixed(2) ;

  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public user: User;

  public listeArticle: [Article];
  public totalRecords: Number;
  public page: Number = 1 ;
  public url: string;
  public resume: string;
  //
  public datasets1: any;
  public datasets2: any;
  public datasets3: any;
  //
  public graphique1: Graphe2;
  public graphique2: Graphe2;
  public graphique3: Graphe2;

  public id;
  public company: Entreprise;
  public id_company;

  constructor( private router: Router, private bourseService: BourseService,
               private articleService: ArticleService,
               private document: Document,
               config: NgbModalConfig, private modalService: NgbModal) {
  // customize default values of modals used by this component tree
  config.backdrop = 'static';
  config.keyboard = false;
}

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

  dessineGraphique(localVariable: string , dataset, graphique: Graphe2, nameLabel, chartName, type, chartExemple) {
    graphique = JSON.parse(localStorage.getItem(localVariable));
     dataset = {
       labels: graphique.x,
       datasets: [
         {label: nameLabel,
           data: graphique.y
         }]
     };
    console.log('x : ' + graphique.x + '  y : ' + graphique.y);
    this.salesChart = new Chart(chartName, {
      type: type,
      options: chartExemple.options,
      data: dataset });
  }
  majAction() {
    this.majActionMean();
    this.majActionVariance();
}
  majActionMean() {
    this.actionMean = Number(localStorage.getItem('actionMean'));
  }
  majActionVariance() {
    this.actionVariance = Number(localStorage.getItem('actionVariance'));
  }
  MeansPositiveSentiment(liste) {
    let somme = 0 ;
    console.log('somme : ' + somme);
    for (let i = 0 ; i < liste.length ; i++) {
     somme += this.articleSentiment(liste[i].number_negative, liste[i].number_positive) ;
     console.log('somme : ' + somme);
    }
    this.sentimentPositiveMean = Number(((somme / liste.length )).toFixed(0));
  }

  async majListeArticle(chartSales, chartSafes) {
    this.company = JSON.parse(localStorage.getItem('entreprise'));
    if ( (this.company.company_id !== this.id_company)  ) {
      this.id_company = this.company.company_id;
      this.articleService.postArticle(this.company.company_id) ;
      // this.bourseService.getBourse(this.company);
      setTimeout (() => {
        this.listeArticle = JSON.parse(localStorage.getItem('article'));
        this.totalRecords = this.listeArticle.length;
        this.majAction();
        this.MeansPositiveSentiment( this.listeArticle);
        this.dessineGraphique('graphique1' , this.datasets1, this.graphique1, 'Prix action', chartSales, 'line', chartExample1);
        this.dessineGraphique('graphique3' , this.datasets3, this.graphique3, 'Ratio sentiment ', chartSafes, 'line', chartExample3);

        /*
        this.graphique1 = JSON.parse(localStorage.getItem('graphique1'));
        this.datasets1 = { labels: this.graphique1.x, datasets: [{label: 'Performance', data: this.graphique1.y }]};
        this.salesChart = new Chart(chartSales, {
          type: 'line',
          options: chartExample1.options,
          data: this.datasets1 });
         */
      }, 1000);
   }
  }


  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));


    // this.graphique2 = JSON.parse(localStorage.getItem('graphique2'));

    /*
    if (this.user.email === '') {
      this.router.navigate(['/tables']);
    }
*/
    /*
    this.datasets2 = {
      labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{label: 'Performance', data: [25, 20, 30, 22, 17, 29]}]
    };
    // this.data = this.datasets[0];
*/
    var chartSales = document.getElementById('chart-sales');
/*
    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
*/
   // var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

/*
    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });
*/
    var chartSafes = document.getElementById('chart-safes');

/*
    this.salesChart = new Chart(chartSafes, {
			type: 'line',
			options: chartExample3.options,
			data: chartExample3.data
		});
*/
    this.id = setInterval(() => {
      this.majListeArticle(chartSales, chartSafes);
    }, 100);


  }

  articleSentiment(n_negative: number , n_positives: number): number {
    return Number(((n_positives / (n_negative + n_positives)) * 100).toFixed(0)) ;
  }
  aticleEntrepriseSentiment(n_negative: number , n_positives: number): number {
    const x = this.articleSentiment(n_negative , n_positives);
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

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  public majresume(url, resume ) {
    const x = url.split('/');
    // this.url = x[x.length - 1 ].substr(0, 30 );
    this.resume = resume;
    this.document.location.href = url ;
  }
  public title( url ) {
    const x = url.split('/');
    let tittle = x[x.length - 1 ];
    tittle = tittle.split('-').join(' ');
    tittle = tittle.split(/1|2|3|4|5|6|7|8|9|0/).join('') ; //  2538158  253 nik158
    return tittle;
  }

  goToUrl(url): void {
    this.document.location.href = url;
  }

}



