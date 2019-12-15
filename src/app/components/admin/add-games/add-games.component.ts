import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { GamesApiService } from '../../../shared/games.api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.css']
})

export class AddGamesComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetGamesForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  gamesForm: FormGroup;
  RatingArray: any = ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private gamesApi: GamesApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.gamesForm = this.fb.group({
      title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      release: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.gamesForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitGamesForm() {
    if (this.gamesForm.valid) {
      this.gamesApi.AddGames(this.gamesForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin/games'))
      });
    }
  }

}