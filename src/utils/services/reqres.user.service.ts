import { HTTP } from "../http/http";
import { config } from "../../config/config";
import _ from "lodash";
import { API_PATH } from "../../data/endpoints";
import { AxiosResponse } from "axios";
import { ListOfUsers, CreateNewUser, NewUser, SingleUser, UpdateUser } from "../http/interfaces";

class ReqresUserService extends HTTP {
    constructor() {
        super({
            baseURL: config.baseUrl
        });
    }

    private static setAxiosConfig(params = {}) {
        const basicConfig = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        return _.merge(basicConfig, params);
    }

    public async getUsersFromPage(pageNumber?: number): Promise<AxiosResponse<ListOfUsers>> {
        return this.get(`${API_PATH.USERS}${pageNumber ? `?page=${pageNumber}` : ''}`, ReqresUserService.setAxiosConfig());
    }

    public async postCreateUser(userData: NewUser): Promise<AxiosResponse<CreateNewUser>> {
        return this.post(API_PATH.USERS, userData, ReqresUserService.setAxiosConfig());
    }

    public async getSingleUser(userId: number): Promise<AxiosResponse<SingleUser>> {
        return this.get(`${API_PATH.USERS}/${userId}`, ReqresUserService.setAxiosConfig());
    }

    public async putUpdateUser(userId: number, updatedUserData: NewUser): Promise<AxiosResponse<UpdateUser>> {
        return this.put(`${API_PATH.USERS}/${userId}`, updatedUserData, ReqresUserService.setAxiosConfig());
    }

    public async getUsersWithDelay(delay: number): Promise<AxiosResponse<ListOfUsers>> {
        return this.get(`${API_PATH.USERS}?delay=${delay}`, ReqresUserService.setAxiosConfig());
    }
}

export const reqresUserService = new ReqresUserService();