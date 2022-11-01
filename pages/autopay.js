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


function populateAuthButtons(obj){
    let returnArray = []
    for(let elem in obj) {
        returnArray.push(<button onClick = {announce} className={"card"}> <p> {obj[elem]}</p></button> )
    }
    return returnArray
}

export default function Autopay(props){
    const [user, setUser] = useState(null)

    useEffect(() => {
       if (user === null) {
           if (isSignInWithEmailLink(auth, window.location.href)) {
               let email = window.localStorage.getItem('emailForSignIn');
               if (!email) email = window.prompt('Please provide your email for confirmation');
               signInWithEmailLink(auth, email, window.location.href)
           }
       }
   }, )

    onAuthStateChanged(auth, (user) => {
        console.log(user)
        setUser(user)
    });

    let authButtons = populateAuthButtons({...props.emailAddresses, ... props.phoneNumbers})

    return(
        <div>
            <NavLinks objArry={[{name: "<------", url: "/"}, {name: "autopay: inactive", url:"/"}]}/>
            <div className={"grid"}>
                {user ?  <AutopaySignedInContent/> : authButtons}
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