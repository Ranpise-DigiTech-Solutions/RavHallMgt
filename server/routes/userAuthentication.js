import { default as express } from 'express';
const router = express.Router();
import { getDatabase, ref, set, get } from 'firebase/database';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';
import { firebaseAuth, firebaseDb } from '../database/FirebaseDb.js';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';

import {
    getAuth,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider
} from "firebase/auth";
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

router.post("/googleSignIn", async (req, res) => {

    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();

    // try {
    //     provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    //     auth.useDeviceLanguage();
    //     signInWithRedirect(auth, provider);
    //     getRedirectResult(auth)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access Google APIs.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;

    //             // The signed-in user info.
    //             const user = result.user;

    //             return res.status(200).json(user);
    //             // IdP data available using getAdditionalUserInfo(result)
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.customData.email;
    //             // The AuthCredential type that was used.
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             // ...
    //         });

    // } catch (error) {
    //     return res.status(500).json({ message: "Internal Server Error" });
    // }

});

router.post("/passwordlessSignIn/", async (req, res) => {

    const { inputValue, inputType, userType } = req.query;

    // var cipherText = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_ENCRYPTION_SECRET_KEY).toString();
    console.log("ENTERED")

    try {

        if (inputType === "EMAIL") {
            // Implementing Firebase Email password-less sign in
            const actionCodeSettings = {
                url: 'http://localhost:5173/DescriptionPage',
                handleCodeInApp: true,
                // iOS: {
                //   bundleId: 'com.example.ios'
                // },
                // android: {
                //   packageName: 'com.example.android',
                //   installApp: true,
                //   minimumVersion: '12'
                // },
                // dynamicLinkDomain: 'example.page.link'
            };

            sendSignInLinkToEmail(firebaseAuth, "adikrishna1972@gmail.com", actionCodeSettings)
                .then(() => {
                    // window.localStorage.setItem('emailForSignIn', email);
                    return res.status(200).json({ message: "Successfully Sent Sign-In mail" });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    return res.status(errorCode).json({ message: errorMessage });
                });



        } else if (inputType === "PHONE") {

        }

        // const existingUsers = await fetchSignInMethodsForEmail(auth, req.body.email);

        // if (existingUsers.length > 0) {
        //   console.log('User already exists with this email. Operation canceled!!');
        //   return response.status(401).json({message: 'User already exists!!'});
        // }

        // const userCredential = await createUserWithEmailAndPassword(auth, req.body?.email, req.body?.password);
        // const user =  userCredential.user;

        // const userRef = ref(db, 'Users/' + user.uid);
        // set(userRef, {
        //     email : req.body.email,
        //     password : cipherText,
        //     userType: req.body.userType,
        //     uid: uuidv4()
        // });

        // console.log("User Created Successfully!!", user.uid);
        // return res.status(200).json({message: user.uid});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

});

router.post("/registerUser", async (req, res) => {

    const { userType, data } = req.body;

    var cipherText = CryptoJS.AES.encrypt(data.password, process.env.PASSWORD_ENCRYPTION_SECRET_KEY).toString();

    try {
        const existingUsers = await fetchSignInMethodsForEmail(firebaseAuth, data.email);

        if (existingUsers.length > 0) {
            console.log('User already exists with this email. Operation canceled!!');
            return response.status(401).json({ message: 'User already exists!!' });
        }

        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
        const user = userCredential.user;

        // Create a new entry in mongodb
        const response = userType === "CUSTOMER" ? await axios.post("http://localhost:8000/eventify_server/customerMaster/", {
            customer_uid: user.uid,
            customer_name: data.fullName,
            customer_email: data.email,
            customer_password: cipherText,
            customer_contact: data.phone,
            customer_location: data.location,
        }) : await axios.post("http://localhost:8000/eventify_server/serviceProviderMaster/", {
            
        });

        const userRef = ref(firebaseDb, 'Users/' + user.uid);
        await set(userRef, {  // Creating a new entry in firebase
            userType: userType,
            name: data.fullName,
            email: data.email,
            contact: data.phone,
            uid: response.data._id,
        });

        console.log("User Created Successfully!!", user.uid);
        return res.status(200).json({
            message: {
                "UID": user.uid,
                "Document": response.data,
            }
        });
    } catch (error) {
        console.log("ERROR", error);
        return res.status(500).json(error.message);
    }
});

export default router;