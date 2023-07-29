import { expect } from "chai";
import { reqresUserService } from "../utils/services/reqres.user.service";
import { checkDateIsToday, generateRandomUserData, getListOfUsersWithDelayAndResponseTime, getSingleUsers, printUsersWithOddId } from "../utils/helpers/helpers";

describe('API tests', () => {
    it('[Validation-1] should get list of users and print those with odd ids', async () => {
        const initialGetUsersResponse = await reqresUserService.getUsersFromPage();
        expect(initialGetUsersResponse.status).to.equal(200);
        const numberOfPages = initialGetUsersResponse.data.total_pages;
        let listOfUsers = [...initialGetUsersResponse.data.data];
        
        for(let i = 2; i <= numberOfPages; i++) {
            const getUsersResponse = await reqresUserService.getUsersFromPage(i);
            listOfUsers = [...listOfUsers, ...getUsersResponse.data.data];
            expect(getUsersResponse.status).to.equal(200);
        }
        printUsersWithOddId(listOfUsers);
    });

    it('[Validation-2] should create new user', async () => {
        const userData = generateRandomUserData();
        const createUserResponse = await reqresUserService.postCreateUser(userData);
        expect(createUserResponse.status).to.equal(201);
        checkDateIsToday(createUserResponse.data.createdAt);
    });

    it('[Validation-3] should update user', async () => {   
        const initialUserData = generateRandomUserData();
        const createNewUserResponse = await reqresUserService.postCreateUser(initialUserData);
        const newUserId = createNewUserResponse.data.id;
        const updatedUserData = generateRandomUserData();
        const updateUserResponse = await reqresUserService.putUpdateUser(newUserId, updatedUserData);
        expect(updateUserResponse.status).to.equal(200);
        
        /*
            Recursive comparison is not needed here as objects have only 1 level of properties with primitive values
            and are not equal to each other. If needed I usually deeply compare objects using _.isEqual(obj1, obj2) 
            method of Lodash library or expect(obj1).to.deep.equal(obj2) assertion of Chai library
        */
        expect(updateUserResponse.data).to.include(updatedUserData);     
    });

    [0, 3].forEach(delay => {
        it(`[Validation-4] should get list of users with delay of ${delay} seconds`, async () => {
            const getListOfUsersResponse = await getListOfUsersWithDelayAndResponseTime(delay);
            const responseTimeWithoutDelay = getListOfUsersResponse.responseTime - (delay * 1000);
            expect(responseTimeWithoutDelay).to.be.lessThan(1000);
        });
    });

    it('[Validation-5] should get 10 single users asynchronously', async () => {
        const result = await getSingleUsers(10);
        result.forEach(response => {
            expect(response.status).to.equal(200);
        });
    });
});