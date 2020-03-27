import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ErrorHandlerService } from '../error-handler/error-handler.service'
import { environment } from '../../../environments/environment.local'
import { catchError, retry } from 'rxjs/operators'
import { SignIn } from '../../types/sign-in.endpoint'

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlerService
  ) {}
  // ?userId=admin%40test.orcid.org&password=password&verificationCode=&recoveryCode=&oauthRequest=false
  signIn(data) {
    console.log('data ' + JSON.stringify(data))
    const body = new FormData()
    body.append('userId', data.username)
    body.append('password', data.password)
    // body.append('verificationCode', '');
    // body.append('recoveryCode', '');
    body.append('oauthRequest', 'false')
    return this._http
      .post<SignIn>(environment.API_WEB + `signin/auth.json`, body, {
        withCredentials: true,
      })
      .pipe(
        retry(3),
        catchError(this._errorHandler.handleError)
      )
  }

  orcidLoginFitler(userId) {
    const orcidPattern = /(\d{4}[- ]{0,}){3}\d{3}[\dX]/
    const extId = orcidPattern.exec(userId)
    if (extId != null) {
      userId = extId[0].toString().replace(/ /g, '')
      userId = userId.toString().replace(/-/g, '')
      const temp = userId.toString().replace(/(.{4})/g, '$1-')
      const length = temp.length
      userId = temp.substring(0, length - 1)
    }
    return userId
  }
}
