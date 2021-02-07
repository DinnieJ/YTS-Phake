import { AxiosResponse } from 'axios';
import { unauthenticatedService, authenticatedService } from './BaseRepository';
import { Endpoint } from '@/constants/app.endpoint';
import { CommentDTO } from '@/constants/app.interface'

export default class CommentRepository {
    public static addComment(payload: CommentDTO): Promise<AxiosResponse<any>> {
        return authenticatedService.post(`${Endpoint.Comment}/add`, payload)
    }

    public static removeComment(id: number): Promise<AxiosResponse<any>> {
        return authenticatedService.post(`${Endpoint.Comment}/remove`, { movie_id: id })
    }
}