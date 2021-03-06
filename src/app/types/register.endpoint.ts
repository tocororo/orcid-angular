import { Value } from './common.endpoint'

export interface RegisterForm {
  errors?: any[]
  sendChangeNotifications?: Value
  sendOrcidNews?: Value
  sendMemberUpdateRequests?: Value
  termsOfUse?: Value
  activitiesVisibilityDefault?: VisibilityValue
  password?: Value
  passwordConfirm?: Value
  email?: Value
  emailsAdditional?: Value[]
  emailConfirm?: Value
  givenNames?: Value
  familyNames?: Value
  creationType?: Value
  referredBy?: Value
  sendEmailFrequencyDays?: Value
  valNumServer?: number
  valNumClient?: number
  grecaptcha?: Value
  grecaptchaWidgetId?: Value
  linkType?: any
  approved?: boolean
  persistentTokenEnabled?: boolean
  emailAccessAllowed?: boolean
  redirectUrl?: any
}

export interface DuplicatedName {
  orcid: string
  email: string
  givenNames: string
  familyNames: string
  institution: string
  createdDate: string
}

export interface VisibilityValue {
  errors?: any[] // TODO is this always empty?
  required?: boolean
  getRequiredMessage?: any
  visibility: 'PUBLIC' | 'LIMITED' | 'PRIVATE'
}
export interface RegisterConfirmResponse {
  errors?: any[]
  url: string
}
