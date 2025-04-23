'use client'

import {useState} from 'react';

import styles from './register.module.css';
import Link from "next/link";
import { InterText } from '@/lib/fonts/Inter';

import { DefaultFormLayout, FormContainer, FormField, FormButton, FormLink } from "@/lib/components/form/Form";
import { testValidEmail, testValidMatricol } from '@/lib/logic/AuthValidators';

function RegisterPage() {

  const [emailField, setEmailField] = useState("");
  const [matricolField, setMatricolField] = useState("");

  const [isSubmitError, setIsSubmitError] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
          placeholder={"exemplu@gmail.com"}
          setState={setEmailField} 
          trim
          validator={testValidEmail}
          validate={hasSubmitted}
        >
        </FormField>

        <FormField
          type={"matricol"}
          label={"Numar matricol"}
          placeholder={"*************"}
          setState={setMatricolField}
          validator={testValidMatricol}
          validate={hasSubmitted}
        >
        </FormField>

        <FormButton onClick={() => setHasSubmitted(true)}>
            Creeaza cont
        </FormButton>

        <FormLink> Ai deja un cont? </FormLink>

      </FormContainer>
    </div>
  );
}

export default RegisterPage;
