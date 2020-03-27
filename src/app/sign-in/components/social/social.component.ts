import { Component, Inject, OnInit } from '@angular/core'
import { WINDOW } from '../../../cdk/window'
import { SignInService } from '../../../core/sign-in/sign-in.service'

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
  submitted = false
  loading = false

  constructor(
    private _signIn: SignInService,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit() {}

  onSubmit() {}

  navigateTo(val) {
    this.window.location.href = val
  }
}
