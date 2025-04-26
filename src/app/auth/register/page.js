'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

import { useState } from 'react'; 
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

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const validationError = testValidEmail(email);
    setEmailError(validationError);

    if (!validationError) {
      console.log("Register part 1 successful, redirecting...");
      router.push('/auth/extra-data-required'); 
    } else {
      console.log("Register part 1 validation failed");
    }
  };

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
