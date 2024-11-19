
export function userDataLocalStorage() {

    const userObj = JSON.parse(
        localStorage.getItem('userObj')
    );

    return userObj;
};