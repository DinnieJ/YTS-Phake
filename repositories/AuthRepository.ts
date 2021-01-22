import { AxiosResponse } from 'axios'
import { unauthenticatedService, authenticatedService } from './BaseRepository'
import { Endpoint } from '@/constants/app.endpoint'
import { LoginDTO } from '@/constants/app.interface'

export default class AuthRepository {
    public static login(cred: LoginDTO): Promise<AxiosResponse<any>> {
        return unauthenticatedService.post(`${Endpoint.Auth}/login`, cred);
    } 

    public static logout(): Promise<AxiosResponse<any>> {
        return authenticatedService.post(`${Endpoint.Auth}/logout`);
    }

    public static authUser(): Promise<AxiosResponse<any>> {
        return authenticatedService.get(`${Endpoint.Auth}/user`)
    }
}