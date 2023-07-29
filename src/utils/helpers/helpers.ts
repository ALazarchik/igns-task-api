import { expect } from "chai";
import { NewUser, UserData, ListOfUsersWithResponseTime, SingleUser } from "../http/interfaces";
import { faker } from '@faker-js/faker';
import { reqresUserService } from "../services/reqres.user.service";
import { AxiosResponse } from "axios";

export function printUsersWithOddId(listOfUsers: UserData[]): void {
    listOfUsers.forEach(user => {
        if (user.id % 2 !== 0) {
            console.log(user);
        }
    });
}

export function checkDateIsToday(date: string): void {
    const today = (new Date()).toDateString();
    const dateToCheck = (new Date(date)).toDateString();
    expect(dateToCheck).to.equal(today);
}

export function generateRandomUserData(): NewUser {
    return { name: faker.person.fullName(), job: faker.person.jobTitle() };
}

export async function getListOfUsersWithDelayAndResponseTime(delay: number): Promise<ListOfUsersWithResponseTime> {
    const beforeRequest = Date.now();
    const usersResponse = (await reqresUserService.getUsersWithDelay(delay)).data;
    const responseTime = Date.now() - beforeRequest;
    return { usersResponse, responseTime };
}

export async function getSingleUsers(numberOfUsers: number): Promise<AxiosResponse<SingleUser>[]> {
    let singleUsersRequests = new Array();
    for(let i = 0; i < numberOfUsers; i++) {
        singleUsersRequests[i] = reqresUserService.getSingleUser(i + 1);
    }
    return Promise.all(singleUsersRequests);
} 