'use client'

import { useState,useCallback } from 'react';
import { redirect } from 'next/navigation'; 
import styles from './register.module.css';

import { DefaultFormLayout, FormContainer, FormField, FormButton, FormLink } from "@/lib/components/form/Form";
import { testValidEmail, testValidMatricol } from '@/lib/logic/AuthValidators';
import { performInitialRegister } from '@/lib/actions/performInitialRegister';

function RegisterPage() {
  const [emailField, setEmailField] = useState("");
  const [matricolField, setMatricolField] = useState("");

  const [isSubmitError, setIsSubmitError] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setIsLoading(true);
    setHasSubmitted(true);

    console.log("Register part 1 submit with email:", emailField, "and matricol:", matricolField);

    if (testValidEmail(emailField) == "" && testValidMatricol(matricolField) == "") {
      const registerResolution = await performInitialRegister(emailField, matricolField);
      if (!registerResolution) return;
      if (registerResolution.status !== 200) {
        setIsSubmitError(true);
        console.log("Register part 1 failed with status:", registerResolution.status);
        return;
      }
      setIsLoading(false);
      redirect('/auth/confirm-mail');
    } else {
      console.log("Register part 1 validation failed");
      setIsSubmitError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <DefaultFormLayout
        title={'Creeaza cont'}
        subtitle={'Completeaza formularul de mai jos pentru a crea un cont'}
        showError={isSubmitError}
        errorMessage={"Eroare interna. Incercati mai tarziu."}
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

        <FormButton onClick={handleSubmit}>
            Creeaza cont
        </FormButton>

        <FormLink href={'/auth/login'}> Ai deja un cont? </FormLink>

      </FormContainer>
    </div>
  );
}

export default RegisterPage;
