'use client';

 import { useState } from "react";
 import { useRouter } from 'next/navigation';

 import styles from "./forgotPassword.module.css";
 import '@/app/globals.css';

 import { testValidEmail } from "@/lib/logic/AuthValidators";

 import { DefaultFormLayout, FormContainer, FormField, FormButton } from "@/lib/components/form/Form";

 export default function ForgotPasswordPage() {
     const router = useRouter(); 
     const [emailField, setEmailField] = useState("");
     const [isSubmitError, setIsSubmitError] = useState(false);
     const [hasSubmitted, setHasSubmitted] = useState(false);

     const handleSubmit = async () => {
         setHasSubmitted(true);
         const emailError = testValidEmail(emailField);

         if (!emailError) {
             console.log("Email valid, redirecting to confirm mail...");
             setIsSubmitError(false);
             router.push('/auth/confirm-mail'); 
         } else {
             console.log("E-mail invalid");
             setIsSubmitError(true); 
         }
     };

     const handleGoBack = () => {
        console.log("Redirecting back to login...");
        router.push('/auth/login');
    }; 

     return (
     <div className={styles.formWrapper}>
        
        <button 
            onClick={handleGoBack}
            className={styles.backButton}
        >
           <div className={styles.backArrow}>
                <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                    <path d="M1 1L8.5 8.5L16 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
           </div>
        </button>


        <DefaultFormLayout
            title={"Ai uitat parola?"}
            subtitle={"Introdu adresa ta de mail  mai jos și îți vom trimite un link de resetare a parolei"}
            showError={isSubmitError}
            errorMessage={"E-mail invalid. Vă rugăm să furnizați un mail uaic.ro! "}
        >
            <FormContainer>
                <FormField 
                    type={"email"} 
                    label={"E-mail / E-mail instituțional"} 
                    placeholder={"ex: student@info.uaic.ro"}
                    setState={setEmailField} 
                    trim
                    validator={testValidEmail}
                    validate={hasSubmitted}
                    />
                <FormButton onClick={handleSubmit}>
                    Trimite
                </FormButton>
            </FormContainer>
        </DefaultFormLayout>
    </div>
    );
}
