import { AngularFusejsOptions } from 'angular-fusejs';
import { OnInit, Component } from "@angular/core";
@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h1>Angular-fusejs</h1>
      <input type="search" class="form-control" [(ngModel)]="searchTerms" placeholder="Enter search terms here">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let book of (books | fusejs:searchTerms:searchOptions)">
            <td [innerHTML]="book.fuseJsHighlighted.title"></td>
            <td [innerHTML]="book.fuseJsScore"></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AppComponent implements OnInit{
  private searchOptions: AngularFusejsOptions;
  private books: Array<Object>;

  ngOnInit() {
    this.searchOptions = {
      keys: ['title'],
      maximumScore: 0.5,
    };

    this.books = [
      {
        title: "Old Man's War"
      },
      {
        title: "The Lock Artist"
      },
      {
        title: "HTML5"
      },
      {
        title: "Right Ho Jeeves"
      },
      {
        title: "The Code of the Wooster"
      },
      {
        title: "Thank You Jeeves"
      },
      {
        title: "The DaVinci Code"
      },
      {
        title: "Angels & Demons"
      },
      {
        title: "The Silmarillion"
      },
      {
        title: "Syrup"
      },
      {
        title: "The Lost Symbol"
      },
      {
        title: "The Book of Lies"
      },
      {
        title: "Lamb"
      },
      {
        title: "Fool"
      },
      {
        title: "Incompetence"
      },
      {
        title: "Fat"
      },
      {
        title: "Colony"
      },
      {
        title: "Backwards, Red Dwarf"
      },
      {
        title: "The Grand Design"
      },
      {
        title: "The Book of Samson"
      },
      {
        title: "The Preservationist"
      },
      {
        title: "Fallen"
      },
      {
        title: "Monster 1959"
      }
    ]
  }
}