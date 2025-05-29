'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import '@/app/globals.css';

import { testValidPassword } from "@/lib/logic/AuthValidators";
import { FormContainer, FormField, FormButton } from "@/lib/components/form/Form";
import { BackArrow } from "@/lib/components/globals/NavArrows";

import styles from './resetPassword.module.css';

export default function ResetPasswordPage() {

   const router = useRouter(); 

   const [currentPasswordField, setCurrentPasswordField] = useState("");
   const [newPasswordField, setNewPasswordField] = useState("");
   const [confirmPasswordField, setConfirmPasswordField] = useState("");

   const [isSubmitError, setIsSubmitError] = useState(false);
   const [hasSubmitted, setHasSubmitted] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const hasCurrentPassword = currentPasswordField.trim() !== "";
        const hasNewPassword = newPasswordField.trim() !== "";
        const hasConfirmPassword = confirmPasswordField.trim() !== "";
        const passwordsMatch = newPasswordField === confirmPasswordField;
        const passwordsDiffer = newPasswordField !== currentPasswordField || newPasswordField === "";
        
        setIsFormValid(
            hasCurrentPassword && 
            hasNewPassword && 
            hasConfirmPassword && 
            passwordsMatch && 
            passwordsDiffer
        );
        
        if (isSubmitError) {
            setIsSubmitError(false);
            setErrorMessage("");
        }
    }, [currentPasswordField, newPasswordField, confirmPasswordField, isSubmitError]);


   const validateNewPassword = (value) => 
       {
       const standardValidation = testValidPassword(value);
       if (standardValidation) return standardValidation;

       if (value === currentPasswordField && value !== "") {
           return "Parola nouă trebuie să fie diferită de parola actuală.";
       }

       return "";
   };

   const handleReset = (e) => {
       e.preventDefault();
       setHasSubmitted(true);

       const currentPasswordError = testValidPassword(currentPasswordField);
       const newPasswordError = validateNewPassword(newPasswordField);
       const confirmError = newPasswordField !== confirmPasswordField ? "Parolele nu coincid." : "";

       if (newPasswordField === currentPasswordField && newPasswordField !== "") {
           setErrorMessage("Parola nouă trebuie să fie diferită de parola actuală.");
           setIsSubmitError(true);
           return;
       }

       if (!currentPasswordError && !newPasswordError && !confirmError) {
           router.push('/home');
           setIsSubmitError(false);
           setErrorMessage("");
       } else {
           let message = "Date invalide. Verifică parolele introduse.";

           if (currentPasswordError) {
               message = currentPasswordError;
           } else if (newPasswordError) {
               message = newPasswordError;
           } else if (confirmError) {
               message = confirmError;
           }

           setErrorMessage(message);
           setIsSubmitError(true);
       }
   };

   const handleGoBack = () => {
       router.back();
   };

   return (
       <div className={styles.pageContainer}>
            <div className={styles.backButtonWrapper}>
                <BackArrow onClick={handleGoBack} arrowSize={20} />
            </div>

            <div className={styles.formWrapper}>
               <h1 className={styles.pageTitle}>Resetare parolă</h1>
               <p className={styles.pageDescription}>
                   Introdu parolele în formularul de mai jos
               </p>

               {isSubmitError && (
                   <div className={styles.errorMessage}>
                       {errorMessage}
                   </div>
               )}

               <FormContainer>
                   <FormField 
                       type="password"
                       label="Parolă actuală"
                       placeholder="********"
                       setState={setCurrentPasswordField}
                       trim
                       validator={testValidPassword}
                       validate={hasSubmitted}
                   />

                   <FormField 
                       type="password"
                       label="Parolă nouă"
                       placeholder="********"
                       setState={setNewPasswordField}
                       trim
                       validator={validateNewPassword}
                       validate={hasSubmitted}
                   />

                   <FormField
                       type="password"
                       label="Confirmare parolă nouă"
                       placeholder="********"
                       setState={setConfirmPasswordField}
                       validator={(value) => value !== newPasswordField ? "Parolele nu coincid." : ""}
                       validate={hasSubmitted}
                   />

                   <FormButton onClick={handleReset}  isValid={isFormValid}
>
                       Resetează
                   </FormButton>
               </FormContainer>
           </div>
       </div>
   );
}
