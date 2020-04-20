import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { ErrorHandlerService } from '../error-handler/error-handler.service'
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlerService
  ) {}

  changeLanguage(languageCode: string) {
    languageCode.replace('-', '_')
    return this._http
      .get(environment.API_WEB + 'lang.json?lang=' + languageCode)
      .pipe(
        retry(3),
        catchError(this._errorHandler.handleError)
      )
  }
}
