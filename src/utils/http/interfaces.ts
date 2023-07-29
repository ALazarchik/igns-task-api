export interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface SupportData {
    url: string;
    text: string;
}

export interface ListOfUsers {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserData[];
    support: SupportData;
}

export interface CreateNewUser {
    name: string;
    job: string;
    id: number;
    createdAt: string;
}

export interface NewUser {
    name: string;
    job: string;
}

export interface SingleUser {
    data: UserData;
    support: SupportData;
}

export interface UpdateUser {
    name: string;
    job: string;
    createdAt: string;
}

export interface ListOfUsersWithResponseTime {
    usersResponse: ListOfUsers;
    responseTime: number;
}