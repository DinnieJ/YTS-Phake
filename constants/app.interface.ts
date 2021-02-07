export interface LoginDTO {
  email: string
  password: string
}

export interface MovieDTO {
  movie_id: number,
  title: string,
  title_eng: string,
  year: number,
  rating: number,
  description: string,
  background_img: string,
  cover_img: string,
  url: string,
  source_movie_id: string,
  source: string,
  favorited: boolean,
  total_favorite: number,
}

export interface CommentDTO {
  movie_id: number,
  comment: string
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
