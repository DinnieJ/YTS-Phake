export interface LoginDTO {
  email: string
  password: string
}

export interface LoginRule {
  email: {
    required: boolean
    email: boolean
  },
  password: {
    required: boolean
    min?: number
    max?: number
  }
}

export interface SnackbarInterface {
    message: string,
    color: string
}
