import { signInWithPopup, User } from 'firebase/auth';
import { auth, googleProvider } from '../configs/firebase.config';

export const login = async () => {
    return await signInWithPopup(auth, googleProvider)
        .then(res => res.user)
        .catch(e => {
            console.log("ERROR", e);
            return null;
        })
}

export const logout = async () => {
    return await auth.signOut()
        .then(res => null)
        .catch(e => {
            console.log("ERROR", e);
            return null;
        })
}