import { AxiosResponse } from 'axios';
import { unauthenticatedService, authenticatedService } from './BaseRepository';
import { Endpoint } from '@/constants/app.endpoint';

export default class FavoriteRepository {
    public static likeMovie(id: number): Promise<AxiosResponse<any>> {
        return authenticatedService.post(`${Endpoint.Favorite}/add`, { movie_id: id })
    }

    public static dislikeMovie( id: number ) {
        return authenticatedService.post(`${Endpoint.Favorite}/remove`, { movie_id: id })
    }
}