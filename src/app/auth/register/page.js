'use client'

import { useState,useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './register.module.css';

import { DefaultFormLayout, FormContainer, FormField, FormButton, FormLink } from "@/lib/components/form/Form";
import { testValidEmail, testValidMatricol } from '@/lib/logic/AuthValidators';

function RegisterPage() {
  const router = useRouter(); 
  const [emailField, setEmailField] = useState("");
  const [matricolField, setMatricolField] = useState("");

  const [isSubmitError, setIsSubmitError] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

   useEffect(() => {
    const hasEmail = emailField.trim() !== "";
    const hasMatricol = matricolField.trim() !== "";
    
    setIsFormValid(hasEmail && hasMatricol);
  }, [emailField, matricolField]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault(); 
    setHasSubmitted(true);

    if (testValidEmail(emailField) == "" && testValidMatricol(matricolField) == "") {
      console.log("Register part 1 successful, redirecting...");
      router.push('/auth/confirm-mail');
      return;
    } else {
      console.log("Register part 1 validation failed");
      setIsSubmitError(true);
    }
  }, [emailField, matricolField, router]);

  return (
    <div className={styles.registerContainer}>
      <DefaultFormLayout
        title={'Creeaza cont'}
        subtitle={'Completeaza formularul de mai jos pentru a crea un cont'}
        showError={false}
      >
      </DefaultFormLayout>
      <FormContainer>
        <FormField
          type={"email"} 
          label={"Email"} 
          placeholder={"exemplu@info.uaic.ro"}
          setState={setEmailField} 
          trim
          validator={testValidEmail}
          validate={hasSubmitted}
        >
        </FormField>

        <FormField
          type={"password"}
          label={"Numar de matricol / Numar de marca"}
          placeholder={"*************"}
          setState={setMatricolField}
          validator={testValidMatricol}
          validate={hasSubmitted}
        >
        </FormField>

        <FormButton isValid={isFormValid} onClick={handleSubmit}>
            Creeaza cont
        </FormButton>

        <FormLink href={'/auth/login'}> Ai deja un cont? </FormLink>

      </FormContainer>
    </div>
  );
}

export default RegisterPage;
