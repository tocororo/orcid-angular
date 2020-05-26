import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { ErrorHandlerService } from '../error-handler/error-handler.service'
import { environment } from '../../../environments/environment'
import { catchError, retry } from 'rxjs/operators'
import { SignIn } from '../../types/sign-in.endpoint'
import { Reactivation } from '../../types/reactivation.endpoint'
import { CustomEncoder } from '../custom-encoder/custom.encoder'
import { getOrcidNumber } from '../../constants'
import { SingInLocal, TypeSignIn } from '../../types/sing-in.local'

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private headers: HttpHeaders

  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlerService
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
  }

  signIn(singInLocal: SingInLocal) {
    let loginUrl = 'signin/auth.json'

    if (singInLocal.type && singInLocal.type === TypeSignIn.institutional) {
      loginUrl = 'shibboleth/signin/auth.json'
    }

    let body = new HttpParams({ encoder: new CustomEncoder() })
      .set('userId', getOrcidNumber(singInLocal.data.username))
      .set('password', singInLocal.data.password)
    if (singInLocal.data.verificationCode) {
      body = body.set('verificationCode', singInLocal.data.verificationCode)
    }
    if (singInLocal.data.recoveryCode) {
      body = body.set('recoveryCode', singInLocal.data.recoveryCode)
    }
    body = body.set('oauthRequest', 'false')
    return this._http
      .post<SignIn>(environment.API_WEB + loginUrl, body, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error))
      )
  }

  reactivation(data) {
    let body = new HttpParams({ encoder: new CustomEncoder() })
    body = body.set('email', data.email)
    return this._http
      .post<Reactivation>(environment.API_WEB + `sendReactivation.json`, body, {
        headers: this.headers,
        withCredentials: true,
      })
      .pipe(
        retry(3),
        catchError((error) => this._errorHandler.handleError(error))
      )
  }
}
