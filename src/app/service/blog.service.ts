import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
const routes = {
  getAll: () => `/blogs`,
  getListById: (id: number) => `/blogs/${id}`,
  getParams: (param = new HttpParams()) => `${'blogs?' + param}`,
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private apiService: ApiService) { }

  getBlogsAll() {
    return this.apiService.get(routes.getAll()).pipe(map(res => {
      return res;
    }));
  }

  getBlogsById(id) {
    return this.apiService.get(routes.getListById(id)).pipe(map(res => {
      return res;
    }));
  }

  searchArticles(textSearch) {
    let params = new HttpParams();
    params = params.append('search', textSearch);
    return this.apiService.get(routes.getParams(params)).pipe(map(res => {
      return res;
    }));
  }


  sortArticles(sortBy, order, page, limit) {
    let params = new HttpParams();
    params = params.append('sortBy', sortBy);
    params = params.append('order', order);
    params = params.append('page', page);
    params = params.append('limit', limit);
    return this.apiService.get(routes.getParams(params)).pipe(map(res => {
      return res;
    }));
  }

  /**
 * Create an Array<number>[i], value of array element is being counted from [from]
 * @param i: number
 * @param from: number
 */
  counter(index: number, from: number): any {
    if (index === 0 || isNaN(index)) {
      return new Array();
    }
    return new Array(index).fill(0).map((x, i) => i + from);
  }
}
