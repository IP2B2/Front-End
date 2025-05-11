'use client'

import { useState, useEffect } from "react";
import Link from "next/link";

import formStyles from "./FormStyles.module.css"
import '@/app/globals.css';
import { Inter700, Inter400, Inter500, Inter600 } from '@/lib/fonts/Inter';

export const DefaultFormLayout = (
    { 
        title,
        subtitle,
        showError, 
        errorMessage,
        children
    }
) => {
    return (
        <div className={formStyles.defaultFormLayoutContainer}>
            <div className={formStyles.formHeaderWrapper}>
                <div className={`${formStyles.formTitle} ${Inter700.className}`}>{title}</div>
                <div className={`${formStyles.formSubtitle} ${Inter500.className}`}>{subtitle}</div>
                { showError ? <div className={`${formStyles.formInputErrorMessage}`}>
                    {errorMessage ? errorMessage : ''}
                </div> : ''}
            </div>
            {children}
        </div>
    )
}

export const FormContainer = ({ children }) => {
    return (
        <form className={formStyles.formContainer} noValidate> { /* nu scoate 'noValidate'= face ca html sa nu valideze singur - ci vom valida programatic din react cu functii */}
            {children}
        </form>
    )
}

export const FormLink = ({ href = '#', children }) => { 
    return (
        <Link
            href={href} 
            className={`${formStyles.formLinkWrapper} ${formStyles.formLink} ${Inter500.className}`}
            >
            {children}
        </Link>
    );
} 

export const FormButton = ({ onClick, children }) => {

    const buttonBehaviour = (event) => {
        event.preventDefault();
        onClick?.(event);
    }

    return (
        <button 
            type={"submit"} 
            onClick={buttonBehaviour} 
            className={`${formStyles.formButton} border-rounded ${Inter600.className}`}>
            {children}
        </button>
    )
}

export const FormHollowButton = ({ onClick, children }) => {

    const buttonBehaviour = (event) => {
        event.preventDefault();
        onClick?.(event);
    }

    return (
        <button 
            type={"submit"} 
            onClick={buttonBehaviour} 
            className={`${formStyles.formButton} border-rounded ${Inter500.className} ${formStyles.formHollowButton}`}>
            {children}
        </button>
    )
}

export const FormMultiColumn = ({ cols, children }) => {
    return (
        <div className={`${formStyles.multiColumnContainer}`}
            style={{gridTemplateColumns: `repeat(${(parseInt(cols) != NaN ? cols : 2)}, 1fr)`}}>
                {children}
            </div>
    )
}

export const FormField = ({ type, placeholder, validator, setState, trim, label, validate = true, formInputId }) => {

    const [inputValue, setInputValue] = useState('');
    
    const [isInputError, setIsInputError] = useState(false);
    const [inputError, setInputError] = useState(null);

    const handleInputChange = (event) => {
        if(trim) setInputValue(event.target.value.trim());
        else     setInputValue(event.target.value);
    }

    useEffect(() => {
        setState(inputValue);
        if(!validate || !validator)
            return;
        
        let validationMessage = validator(inputValue);
        if(!validationMessage || validationMessage?.length < 1)
            setInputError(null);
        else setInputError(validationMessage);
    }, [inputValue, validate]);

    useEffect(() => {
        setIsInputError(!!inputError);
    }, [inputError])

    return (
        <div className={`${formStyles.formInputGroup} ${Inter600.className}`}>
            <label>
                {label}
                <input 
                    className={`${formStyles.formInput} border-rounded border-gray ${Inter600.className} ${isInputError ? formStyles.formInputError : ''}`} 
                    placeholder={placeholder} 
                    type={type}
                    onChange={handleInputChange}
                    id={formInputId}
                    name={formInputId}/>
            </label>
            <div className={`${formStyles.formInputErrorMessage}`}>
                { validate && isInputError ? inputError : ''}
            </div>
        </div>
    );
}