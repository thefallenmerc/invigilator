export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";

export {
    addUser, removeUser
}

function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

function removeUser() {
    return {
        type: REMOVE_USER
    }
}