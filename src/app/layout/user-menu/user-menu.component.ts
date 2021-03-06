import { Component, OnInit, Inject } from '@angular/core'
import { UserService } from 'src/app/core'
import { environment } from 'src/environments/environment'
import { UserInfo, NameForm } from 'src/app/types'
import { PlatformInfoService, PlatformInfo } from 'src/app/cdk/platform-info'
import { WINDOW } from 'src/app/cdk/window'
import { TogglzService } from '../../core/togglz/togglz.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: [
    './user-menu.component.scss-theme.scss',
    './user-menu.component.scss',
  ],
})
export class UserMenuComponent implements OnInit {
  state = false
  userInfo: UserInfo
  displayName: string
  platform: PlatformInfo
  togglzOrcidAngularSignin: boolean

  constructor(
    private _router: Router,
    _userInfo: UserService,
    @Inject(WINDOW) private window: Window,
    _platform: PlatformInfoService,
    _togglz: TogglzService
  ) {
    _userInfo.getUserInfoOnEachStatusUpdate().subscribe(data => {
      this.userInfo = data.userInfo
      this.displayName = data.displayName
    })
    _platform.get().subscribe(data => {
      this.platform = data
    })
    _togglz
      .getStateOf('ORCID_ANGULAR_SIGNIN')
      .subscribe(value => (this.togglzOrcidAngularSignin = value))
  }

  ngOnInit() {}

  goto(url) {
    if (url === 'signin') {
      if (!this.togglzOrcidAngularSignin) {
        this.window.location.href = environment.BASE_URL + url
      } else {
        this._router.navigate(['/signin'])
      }
    } else {
      this.window.location.href = environment.BASE_URL + url
    }
  }
}
