import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from '../../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.css']
})

export class UpdatePlayerComponent implements OnInit {
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
        player_name: [data.player_name, [Validators.required]],
        player_rank: [data.player_rank, [Validators.required]],
        player_score: [data.player_score, [Validators.required]],
        player_time: [data.player_time, [Validators.required]],
        games_played: [data.games_played, [Validators.required]],
        player_status: [data.player_status]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.playerForm = this.fb.group({
      player_name: ['', [Validators.required]],
      player_rank: ['', [Validators.required]],
      player_score: ['', [Validators.required]],
      player_time: ['', [Validators.required]],
      games_played: ['', [Validators.required]],
      player_status: ['Available']
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
    if (window.confirm('Are you sure you want to update?')) {
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin/player-list'))
      });
    }
  }
  
}