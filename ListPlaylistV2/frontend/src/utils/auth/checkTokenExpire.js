import store from "../../state/store";
import * as authActions from '../../state/authentication/authenticationActions';

export const checkCredentialsExpire = () => {
    let state = store.getState();
    const {googleExpiresAt, spotifyExpiresAt, authenticatedWithGoogle, authenticatedWithSpotify} = state.authentication;
    if(!(authenticatedWithGoogle && authenticatedWithSpotify)){
        return;
    }

    let currentTime = new Date().getTime();
    console.log(currentTime + " | " + googleExpiresAt + ", " + spotifyExpiresAt + "; minutes left till expire: "+(Math.min(googleExpiresAt, spotifyExpiresAt)-currentTime)/60000);

    if(Math.min(googleExpiresAt, spotifyExpiresAt) <= currentTime){
        store.dispatch(authActions.completeLogout());
    }

};
