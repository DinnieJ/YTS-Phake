import { AxiosResponse } from 'axios';
import { unauthenticatedService, authenticatedService } from './BaseRepository';
import { Endpoint } from '@/constants/app.endpoint';

export default class MovieRepository {
    public static getRandomMovie(): Promise<AxiosResponse<any>> {
        return unauthenticatedService.get(`${Endpoint.Movie}/random`)
    } 

    public static getAllMovies(page: number) : Promise<AxiosResponse<any>> {
        return unauthenticatedService.get(`${Endpoint.Movie}`, { params: { page } })
    }

    public static getAllMoviesAuth(page: number) : Promise<AxiosResponse<any>> {
        return authenticatedService.get(`${Endpoint.Movie}`, { params: { page } })
    }

    public static getMovie(id: number) : Promise<AxiosResponse<any>> {
        return unauthenticatedService.get(`${Endpoint.Movie}/detail/${id}`)
    }

    public static getMovieAuth(id: number) : Promise<AxiosResponse<any>> {
        return authenticatedService.get(`${Endpoint.Movie}/detail/${id}`)
    }
}