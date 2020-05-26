import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DiscoService } from '../../../core/disco/disco.service'
import { OauthService } from '../../../core/oauth/oauth.service'
import { ShibbolethSignInData } from '../../../types/shibboleth-sign-in-data'
import { Institutional } from '../../../types/institutional.endpoint'
import { TypeSignIn } from '../../../types/sing-in.local'

@Component({
  selector: 'app-institutional-linking',
  templateUrl: './institutional-linking.component.html',
  styleUrls: [
    './institutional-linking.component.scss',
    './institutional-linking.component.scss-theme.scss',
  ],
})
export class InstitutionalLinkingComponent implements OnInit {
  loading = false
  show2FA = false
  shibbolethSignInData: ShibbolethSignInData
  institution: Institutional
  institutionName: string
  loadedFeed = false
  authorizationForm: FormGroup
  signInType = TypeSignIn.institutional

  constructor(
    private _disco: DiscoService,
    private _oauthService: OauthService
  ) {
    this.loadShibbolethSignInData()
  }

  ngOnInit(): void {
    this.authorizationForm = new FormGroup({})
  }

  loadShibbolethSignInData() {
    this._oauthService
      .loadShibbolethSignInData()
      .pipe()
      .subscribe(
        (data) => {
          this.shibbolethSignInData = data
          this.getInstitution(this.shibbolethSignInData.providerId)
        },
        (error) => {
          // TODO @leomendoza123 display error using a toaster
          console.log('Error getting disco feed' + JSON.stringify(error))
        }
      )
  }

  getInstitution(entityId) {
    this._disco
      .getDiscoFeed()
      .pipe()
      .subscribe(
        (institutions) => {
          this.institutionName = institutions
            .filter((institution) => institution.entityID === entityId)
            .map((result) => {
              return result.DisplayNames.filter(
                (subElement) => subElement.lang === 'en'
              ).map((en) => {
                return en.value
              })
            })[0]
            .toString()
          this.loadedFeed = true
        },
        (error) => {
          // TODO @leomendoza123 display error using a toaster
          console.log('Error getting disco feed' + JSON.stringify(error))
        }
      )
  }

  show2FAEmitter($event) {
    this.show2FA = true
  }
}
