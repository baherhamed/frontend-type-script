import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as paginationValues from '../../common/pagination';
@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() paginationData: any;
  @Output() pageChange = new EventEmitter<PageEvent>();

  constructor() {}
  pageIndex = 0;
  pageSize = 0;
  length = 0;

  pageSizeOptions = [5, 10, 20, 50, 100];
  showFirstLastButtons = true;

  async ngOnInit() {
    if (this.paginationData) {
      this.length = this.paginationData.totalDocs;
      this.pageSize = this.paginationData.limit;
      this.pageIndex = this.paginationData.page - 1;
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
