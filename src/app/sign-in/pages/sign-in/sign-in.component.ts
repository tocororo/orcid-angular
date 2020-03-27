import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TLD_REGEXP } from '../../../constants'
import { WINDOW } from '../../../cdk/window'
import { SignInService } from '../../../core/sign-in/sign-in.service'
import { ThemePalette } from '@angular/material'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [
    './sign-in.component.scss-theme.scss',
    './sign-in.component.scss',
  ],
})
export class SignInComponent implements OnInit {
  status = false
  value = false
  _subscriptAnimationState = ''
  loading = false
  submitted = false
  color: ThemePalette = 'primary'

  constructor(
    private _signIn: SignInService,
    @Inject(WINDOW) private window: Window,
    private dialog: MatDialog
  ) {}

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(TLD_REGEXP),
  ])
  passwordFormControl = new FormControl('', [Validators.required])

  authorizationForm = new FormGroup({
    username: this.usernameFormControl,
    password: this.passwordFormControl,
  })

  ngOnInit() {}

  onSubmit() {
    const value = this.authorizationForm.getRawValue()
    // Mark all elements as touch to display untouched FormControl errors
    this.authorizationForm.markAllAsTouched()
    // If the local validations pass, call the backend
    if (this.authorizationForm.valid) {
      this.loading = true
      const $recovery = this._signIn.signIn(value)
      $recovery.subscribe(data => {
        this.loading = false
        //     // Sets the list of backend errors to the control
        if (data.errors && data.errors.length) {
          this.authorizationForm.controls['email'].setErrors({
            backendErrors: data.errors || null,
          })
        } else if (data.successMessage.length) {
          this.submitted = true
        }
      })
    }
  }

  navigateTo(val) {
    this.window.location.href = val
  }
}
