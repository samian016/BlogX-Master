import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import initializationAuth from '../firebase/firebase.initialize';
initializationAuth();
const useFirebase = () => {

    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const setNewUserName = (name, image) => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        }).then((result) => {
            setUser(result.user)
        }).catch((error) => {
            setMessage(error.message)
        });
    }
    const verification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
            });
    }
    const signUsingGoogle = () => {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then(result => {
                verification();
                setUser(result.user)
            }).catch((error) => {
                setMessage(error.message)
            }).finally(() => {
                setIsLoading(false)
            });
    }
    const createUsingEmail = (email, password, name, image) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setNewUserName(name, image);
                verification();
                setUser(user);
            })
            .catch((error) => {
                setMessage(error.message);
            }).finally(() => {
                setIsLoading(false)
            });
    }
    const signUsingEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                verification();
                setUser(result.user);
            })
            .catch((error) => {
                setMessage(error.message);
            }).finally(() => {
                setIsLoading(false)
            });
    }

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage('check mail.')
            })
            .catch((error) => {
                setMessage(error.message);
            }).finally(() => {
                setIsLoading(false)
            });
    }
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            setMessage(error.message)
        }).finally(() => {
            setIsLoading(false)
        });
    }


    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])




    return {
        user,
        message,
        logOut,
        isLoading,
        admin,
        signUsingGoogle,
        createUsingEmail,
        signUsingEmail,
        resetPassword
    }
};

export default useFirebase;