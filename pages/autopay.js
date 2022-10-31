import NavLinks from "../Components/NavLinks";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {fetchIdentifiers} from "./api/dataFetching.mjs";
import { getAuth, sendSignInLinkToEmail , onAuthStateChanged, signInWithEmailLink, isSignInWithEmailLink, signOut} from "firebase/auth";

import { getMessaging, onMessage } from "firebase/messaging";
import {initializeApp} from "firebase/app";
import {useEffect, useState} from "react";

export async function getStaticProps(){

    let emailAddresses = await fetchIdentifiers("email addresses")
    let phoneNumbers = await fetchIdentifiers("phone numbers")
    return{
        props: {emailAddresses, phoneNumbers}
    }
}
const firebaseConfig = {
    apiKey: "AIzaSyDPGmgTxlAsVkakZrGbs8NTF2r0RcWu_ig",
    authDomain: "luminous-lambda-364207.firebaseapp.com",
    projectId: "luminous-lambda-364207",
    storageBucket: "luminous-lambda-364207.appspot.com",
    messagingSenderId: "518969290682",
    appId: "1:518969290682:web:d7be744cb378ec83d4f783"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();




export default function Autopay(props){
    /// INITIALIZE fire FIREBASE and FIRESTORE

    const [user, setUser] = useState(null)

    useEffect(() => {



        if (isSignInWithEmailLink(auth, window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            let email = window.localStorage.getItem('emailForSignIn');

            console.log("email: ")

            console.log(window.localStorage.getItem('emailForSignIn'))
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                // Clear email from storage.
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
            })
            .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
            });
        }
    }, )
    onAuthStateChanged(auth, (user) => {
        console.log(user)
        setUser(user)
    });
    console.log(props.phoneNumbers)
    console.log(props.emailAddresses)

    let authChoices = []
    let emails = props.emailAddresses
    for(let elem in props.emailAddresses) {
        authChoices.push(<button onClick = {announce} className={"card"}> <p> {props.emailAddresses[elem]}</p></button> )
    }
    for(let elem in props.phoneNumbers) {
        authChoices.push(<button onClick = {announce2}  className={"card"}> <p> {props.phoneNumbers[elem]}</p></button> )
    }

    return(
        <div>
            <NavLinks objArry={[{name: "<------", url: "/"}, {name: "autopay: inactive", url:"/"}]}/>

            <div className={"grid"}>

                {user ?  <AutopaySignedInContent/> : authChoices}




            </div>

        </div>
    )
}

function AutopaySignedInContent(){
    return(
            <>
            <h1>you're way too much, too too much</h1>
            <button onClick={()=> auth.signOut().then(console.log("signed out"))}> dd </button>
            
            </>
    )
}

function announce2(){
    console.log(auth.currentUser)
}

function announce(z){

    console.log(z)

    let email = z.target.innerText
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000/autopay',
        // This must be true.
        handleCodeInApp: true,
    };

    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
.then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
});




}