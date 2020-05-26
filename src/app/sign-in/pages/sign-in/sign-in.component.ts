import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../core'
import { environment } from 'src/environments/environment'
import { take, tap } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'
import { OauthParameters } from 'src/app/types'
import { TypeSignIn } from '../../../types/sing-in.local'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [
    './sign-in.component.scss-theme.scss',
    './sign-in.component.scss',
  ],
  host: { class: 'container' },
  preserveWhitespaces: true,
})
export class SignInComponent implements OnInit {
  loading = false
  isLoggedIn = false
  displayName: string
  realUserOrcid: string
  show2FA = false
  signInType = TypeSignIn.personal

  constructor(
    private _userInfo: UserService,
    _route: ActivatedRoute,
    private _router: Router
  ) {
    _userInfo
      .getUserStatus()
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.isLoggedIn = data
          _userInfo
            .getUserInfoOnEachStatusUpdate()
            .pipe(take(1))
            .subscribe((info) => {
              this.displayName = info.displayName
              this.realUserOrcid =
                'https:' + environment.BASE_URL + info.userInfo.REAL_USER_ORCID
            })
        }
      })

    _route.queryParams
      .pipe(
        // More info about signin query paramter https://members.orcid.org/api/oauth/get-oauthauthorize
        take(1),
        tap((value: OauthParameters) => {
          if (value.show_login === 'false') {
            this._router.navigate(['/register'], { queryParams: value })
          }
        })
      )
      .subscribe()
  }

  ngOnInit() {}

  show2FAEmitter($event) {
    this.show2FA = true
  }
}
