import { Games } from '../../../shared/games';
import { GamesApiService } from '../../../shared/games.api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  GamesData: any = [];
  dataSource: MatTableDataSource<Games>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'platform', 'genre', 'rating', 'publisher', 'release', 'status', 'action'];

  constructor(private gamesApi: GamesApiService) {
    this.gamesApi.GetGames().subscribe(data => {
      this.GamesData = data;
      this.dataSource = new MatTableDataSource<Games>(this.GamesData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteGames(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.gamesApi.DeleteGames(e._id).subscribe()
    }
  }

}