import jwt from 'jsonwebtoken';

export const UserIsvalid = (token) => {
    console.log("The token is " + token.user);
    if (token.isAuthenticated) {
        let decodedToken = jwt.decode(token.user);
        let dateNow = new Date();
        if (decodedToken.exp > dateNow.getTime() / 1000) return true;
        else return false;
    }
    return false;
}