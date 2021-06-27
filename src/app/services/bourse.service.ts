import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Entreprise} from '../model/entreprise.model';
import {Graphe2} from '../model/graphe2.model';

interface Pagination {
  'limit';
  'offset';
  'count';
  'total';
}
interface DataDate {
      'open': number;
      'high': number;
      'low': number;
      'close': number;
      'volume': number;
      'adj_high';
      'adj_low';
      'adj_close' ;
      'adj_open';
      'adj_volume';
      'split_factor';
      'symbol': string;
      'exchange':  string;
      'date': Date;
}
interface Data {
  'pagination': Pagination;
  'data': [DataDate];
}

@Injectable({
  providedIn: 'root'
})
export class BourseService {
  key = '21d067bc8f71c64213f3db98cd37e892';
  dateFrom: Date ;
  dateTo: Date ;
  dataCollect: Data;
  graph: Graphe2;
  constructor( private http: HttpClient, public datepipe: DatePipe) { }

  initDate() {
    this.dateTo = new Date();
    this.dateFrom = new Date();
    this.dateFrom.setDate(this.dateFrom.getDate() - 10);
    this.datepipe.transform(this.dateTo, 'yyyy-MM-dd') ;
    this.datepipe.transform(this.dateFrom, 'yyyy-MM-dd') ;
    console.log('date ' + this.dateFormatParam( this.dateFrom) + 'date 2 : ' + this.dateTo.toISOString());
  }

  daymonth(i: number) {
    if ( i < 10 ) {
      return '0' + String(i);
    } else {
      return String(i);
    }
  }

  dateFormatParam(date: Date) {
    const day: String = this.daymonth(date.getDate());
    const month: String = this.daymonth(date.getMonth() + 1);
    const year: String = this.daymonth(date.getFullYear());
    return year + '-' + month + '-' + day;
  }
  //
  createMsgGraph(entreprise: Entreprise, x, y) {
    const msg = ' {"company_id":"' + entreprise.company_id + '",\n' +
      ' "name":"' + entreprise.name + '",\n' +
      ' "x":[' + x + '],\n' +
      ' "y":[' + y + ']\n' +
      ' }' ;
    return msg;
  }
  //
  createRequest( entreprise: Entreprise, dateFrom, dateTo) {
   const url = 'http://api.marketstack.com/v1/eod?access_key=' + this.key + '&symbols=' + entreprise.symbol
    + '&date_from=' + this.dateFormatParam( dateFrom) + '&date_to=' + this.dateFormatParam( dateTo) ;
   return url ;
  }

  means(x): Number {
    let somme: number = 0;
    for ( let i = 0; i < x.length; i++) {
      somme += x[i];
    }
    return Number((somme / x.length).toFixed(0));
  }
  variance(mean, x): number {
    console.log('mean : ' + mean + '  x  :' + x );
    return Number((((mean * 100 ) / x ) - 100 ).toFixed(2));
  }

  getBourse(entreprise: Entreprise) {
    let x = [];
    let y = [];
    let actionMean: number;
    let actionVariance: number;
   this.initDate();
   const url: string = this.createRequest(entreprise, this.dateFrom, this.dateTo);

  this.http.get<Data>(url)
     .subscribe(value => {
       this.dataCollect = value;
       for ( let i = (this.dataCollect.data.length - 1) ; i > -1  ; i--  ) {
          x.push( '"' + this.datepipe.transform( this.dataCollect.data[i].date , 'MM-dd-yyyy') + '"' );
          y.push( Number(this.dataCollect.data[i].open));
       }
       // @ts-ignore
         actionMean = this.means( y );
       actionVariance = this.variance(actionMean, y[0]) ;
       this.graph = JSON.parse(this.createMsgGraph(entreprise, x, y)) ;
       localStorage.setItem('graphique1', JSON.stringify(this.graph));
       localStorage.setItem('actionMean', String(actionMean));
       localStorage.setItem('actionVariance', String(actionVariance));
     },
       (error) => {
         console.log(' APi Erreur ! : ' + error);
       });

  }
}
