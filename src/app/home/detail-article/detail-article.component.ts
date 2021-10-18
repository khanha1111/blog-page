import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  //id for article
  @Input() id;
  public article = {
    id: "",
    createdAt: "",
    title: "",
    image: "",
    content: ""
  };
  isLoadding = false;
  constructor(
    public activeModal: NgbActiveModal,
    private blogService: BlogService) { }

  /**
   * Get initial data
   */
  ngOnInit(): void {
    this.isLoadding = !this.isLoadding;
    this.blogService.getBlogsById(this.id).subscribe(
      rs => {
        if (!rs) {
          this.isLoadding = !this.isLoadding;
          return 0;
        }
        this.article = rs;
        this.isLoadding = !this.isLoadding;
      });
  }
}
