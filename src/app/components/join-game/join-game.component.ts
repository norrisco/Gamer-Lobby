import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetPlayerForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;
  RankArray: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  TimeArray: any = ['1 hr', '2 hrs', '3 hrs', '4 hrs', '5+ hrs'];
  GamesArray: any = ['Overwatch', 'Minecraft', 'League of Legends', 'Warcraft III', 'Fortnite'];

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
      console.log(data.subjects)
      this.playerForm = this.fb.group({
        player_name: [{value: data.player_name, disabled: true}, [Validators.required]],
        player_rank: [{value: data.player_rank, disabled: true}, [Validators.required]],
        player_score: [{value: data.player_score, disabled: true}, [Validators.required]],
        player_time: [{value: data.player_time, disabled: true}, [Validators.required]],
        games_played: [data.games_played, [Validators.required]],
        player_status: ['In Game']
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.playerForm = this.fb.group({
      player_name: [{value: '', disabled: true}, [Validators.required]],
      player_rank: [{value: '', disabled: true}, [Validators.required]],
      player_score: [{value: '', disabled: true}, [Validators.required]],
      player_time: [{value: '', disabled: true}, [Validators.required]],
      games_played: ['', [Validators.required]],
      player_status: ['In Game']
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updatePlayerForm() {
    console.log(this.playerForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Joining game will change your status.')) {
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/player-ranking'))
      });
    }
  }
  
}