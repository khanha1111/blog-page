import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from '../service/blog.service';
import { DetailArticleComponent } from './detail-article/detail-article.component';

export interface Blogs {
  id: string;
  createdAt: string;
  title: string;
  image: number;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public articles: any[] = [];
  public key_object: any[] = [];
  isLoadding = false;
  constructor(
    private blogService: BlogService,
    private modalService: NgbModal
  ) { }
  paginate = {
    currentPage: 1,
    pageSize: 10,
    totalRow: 0,
    totalPage: 0,
    totalPageArray: [],
  }

  // request by sort
  requestSort = {
    sortBy: '',
    order: 'asc'
  }
  textSearch = '';
  /**
   * Get initial data
   */
  ngOnInit(): void {
    this.loadDataAll();
  }

  /**
   * Load all articles,
   */
  loadDataAll() {
    this.isLoadding = !this.isLoadding;
    this.blogService.getBlogsAll().subscribe(
      rs => {
        if (!rs) {
          this.isLoadding = !this.isLoadding;
          return 0;
        }
        this.key_object = Object.keys(rs[0]);
        this.paginate.totalRow = rs.length;
        this.paginate.totalPage = Math.ceil(this.paginate.totalRow / this.paginate.pageSize);
        this.paginate.totalPageArray = this.blogService.counter(Math.ceil(this.paginate.totalRow / this.paginate.pageSize), 1);
        this.onFilterPaginate(this.paginate.currentPage);
        this.isLoadding = !this.isLoadding;
      });
  }

  /**
   * Paginate page articles,
   * @param page: number
   */
  onFilterPaginate(page) {
    this.blogService.sortArticles(this.requestSort.sortBy, this.requestSort.order,
      page, this.paginate.pageSize).subscribe(
        rs => {
          if (!rs) {
            return 0;
          }
          this.paginate.currentPage = page;
          this.articles = rs;
        });
  }

  /**
   * Search articles,
   * @param textSearch: string
   */
  onSearchArticles(textSearch) {
    this.isLoadding = !this.isLoadding;
    this.textSearch = textSearch;
    this.blogService.searchArticles(textSearch).subscribe(
      rs => {
        if (!rs) {
          this.isLoadding = !this.isLoadding;
          return 0;
        }
        if (textSearch != '') {
          this.articles = rs;
        }
        else {
          this.articles = rs.slice(0, this.paginate.pageSize);
        }
        this.isLoadding = !this.isLoadding;
      });
  }

  /**
   * On click button filter articles
   */
  onFilterArticles() {
    this.textSearch = '';
    this.isLoadding = !this.isLoadding;
    this.blogService.sortArticles(this.requestSort.sortBy, this.requestSort.order,
      this.paginate.currentPage, this.paginate.pageSize).subscribe(
        rs => {
          if (!rs) {
            this.isLoadding = !this.isLoadding;
            return 0;
          }
          this.articles = rs;
          this.isLoadding = !this.isLoadding;
        });
  }

  /**
   * On click button open detail article
   */
  openDetailArticle(id) {
    const modalRef = this.modalService.open(DetailArticleComponent);
    modalRef.componentInstance.id = id;
  }
}