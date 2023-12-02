export interface Token {
  access_token: string
  refresh_token: string
}

export interface TLogin {
  username: string
  password: string
  grant_type: string
  client_id: string
  client_secret: string
}

export interface ResponseLogin {
  data: Token
  status: number
}
