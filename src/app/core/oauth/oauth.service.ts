import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { ShibbolethSignInData } from '../../types/shibboleth-sign-in-data'
import { ErrorHandlerService } from '../error-handler/error-handler.service'

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  private headers: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlerService
  ) {
    this.headers = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    );
  }

  loadShibbolethSignInData( ): Observable<ShibbolethSignInData> {
    return this._http.get<ShibbolethSignInData>(
      environment.BASE_URL + 'shibboleth/signinData.json',
      { headers: this.headers }
    );
  }
}
