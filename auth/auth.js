import { fetchData, getUsers } from "../context/contextData.js";

export async function login(username, password) {
    await fetchData();

    const users = getUsers();
    const user = users.find((u) =>

        u.username === username &&
        u.password === password &&
        u.profile_image_path &&
        u.email &&
        u.first_name &&
        u.id
    );

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userObj', JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.first_name,
            profileImage: user.profile_image_path
        }));
        return true;
    }
    return false;
}

export function logOut() {
    localStorage.clear();
    window.location.href = 'login.html';
}

export function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}
