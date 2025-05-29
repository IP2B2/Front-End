'use client';

 import { useState, useEffect } from "react";
 import { useRouter } from 'next/navigation';

 import styles from "./forgotPassword.module.css";
 import '@/app/globals.css';

 import { testValidEmail } from "@/lib/logic/AuthValidators";

 import { DefaultFormLayout, FormContainer, FormField, FormButton } from "@/lib/components/form/Form";
 import { BackArrow } from "@/lib/components/globals/NavArrows";

 export default function ForgotPasswordPage() {
     const router = useRouter(); 
     const [emailField, setEmailField] = useState("");
     const [isSubmitError, setIsSubmitError] = useState(false);
     const [hasSubmitted, setHasSubmitted] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isEmailValid = emailField.trim() !== "";
        setIsFormValid(isEmailValid);
        
        if (isSubmitError) {
            setIsSubmitError(false);
        }
    }, [emailField, isSubmitError]);

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
        <div className={styles.backButtonWrapper}>
            <BackArrow onClick={handleGoBack} arrowSize={20} />
        </div>


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
                <FormButton onClick={handleSubmit}  isValid={isFormValid} >
                    Trimite
                </FormButton>
            </FormContainer>
        </DefaultFormLayout>
    </div>
    );
}
