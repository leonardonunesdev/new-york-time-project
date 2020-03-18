import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//Services
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('pageInformation') pageInformation;
  @ViewChild('loadModal') loadModal;

  numPagePagination: any;
  newsArray: any;
  title: String;
  snippet: String;
  url: String;

  constructor(private newsService: NewsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.numPagePagination = 1;
    this.getNewsNewYorkTime(1);
  }

  //Load the news
  async getNewsNewYorkTime(page){
    console.log("Page Number: " + page);
    await this.newsService.getNewsNewYorkTime(page).subscribe(
      data => {
        this.newsArray = data.response.docs;
        this.modalService.dismissAll('loadModal');
      },
      error=>{
        console.log;
        this.modalService.dismissAll('loadModal');
      });
      
  }

  //Open news information modal
  openModal(targetModal, news){
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.title = news.headline.main;
    this.snippet = news.snippet;
    this.url = news.web_url;
  }

  //Control what page is active
  controlNumPage(event){
    var numPagePaginationAux = this.numPagePagination;

    this.modalService.open(this.loadModal, {
      centered: true
    });

    if(event == 'Previous'){
      if((numPagePaginationAux -= 1) >= 1)
      {
        this.numPagePagination -= 1;
      }
    }else{
      if((numPagePaginationAux += 1) <= 200){
        this.numPagePagination += 1;
      }
    }

    this.pageInformation.nativeElement.innerHTML = "Show " + this.numPagePagination + " page of 200.";

    this.getNewsNewYorkTime(this.numPagePagination);
  }

}
