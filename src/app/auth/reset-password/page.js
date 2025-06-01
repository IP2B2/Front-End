'use client';

 import { useState } from "react";
 import { useRouter } from 'next/navigation';

 import styles from "./resetPassword.module.css";
 import '@/app/globals.css';

 import { testValidPassword } from "@/lib/logic/AuthValidators";

 import { DefaultFormLayout, FormContainer, FormField, FormButton } from "@/lib/components/form/Form";

 export default function ResetPasswordPage() {
     const router = useRouter(); 
     const [newPasswordField, setNewPasswordField] = useState("");
     const [confirmPasswordField, setConfirmPasswordField] = useState("");

     const [isSubmitError, setIsSubmitError] = useState(false);
     const [hasSubmitted, setHasSubmitted] = useState(false);

     const handleReset = async () => {
         setHasSubmitted(true);

         const passwordError = testValidPassword(newPasswordField);
         const confirmError = newPasswordField !== confirmPasswordField ? "Parolele nu coincid." : "";

         if (!passwordError && !confirmError) {
             console.log("Password reset successful, redirecting...");
             router.push('/acasa'); 
             setIsSubmitError(false);
         } else {
             console.log("Reset failed validation");
             setIsSubmitError(true); 
         }
     };

     return (
     <div className={styles.formWrapper}>
         <DefaultFormLayout
             title={"Resetare parolă"}
             subtitle={"Introdu noua parolă în formularul de mai jos"}
             showError={isSubmitError}
             errorMessage={"Parolă invalidă sau parolele nu coincid."}
         >
             <FormContainer>
                 <FormField 
                     type={"password"} 
                     label={"Parolă nouă"} 
                     placeholder={"********"}
                     setState={setNewPasswordField} 
                     trim
                     validator={testValidPassword}
                     validate={hasSubmitted}
                     />
                 <FormField
                     type={"password"} 
                     label={"Confirmare parolă"}
                     placeholder={"********"}
                     setState={setConfirmPasswordField}
                     validator={(value) => value !== newPasswordField ? "Parolele nu coincid." : ""}
                     validate={hasSubmitted}
                     />
                 <FormButton onClick={handleReset}>
                     Resetează
                 </FormButton>
             </FormContainer>
         </DefaultFormLayout>
     </div>
     );
 }
