export interface LoginFormState {
  phone: string
  password: string
  imgCode: string
}

export interface EmitType {
  (e: 'trigger', data?: string): void
}
