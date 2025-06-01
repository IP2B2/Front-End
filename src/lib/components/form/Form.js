"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import ProductImageCarousel from "../home/echipamente/ProductImageCarousel";
import uploadImage from "@/lib/logic/imgurImageUpload";

import formStyles from "./FormStyles.module.css";
import "@/app/globals.css";
import { Inter700, Inter500, Inter600 } from "@/lib/fonts/Inter";
import classPack from "@/lib/classPack";

export const DefaultFormLayout = ({
	title,
	subtitle,
	showError,
	errorMessage,
	children,
}) => {
	return (
		<div className={formStyles.defaultFormLayoutContainer}>
			<div className={formStyles.formHeaderWrapper}>
				<div
					className={`${formStyles.formTitle} ${Inter700.className}`}
				>
					{title}
				</div>
				<div
					className={`${formStyles.formSubtitle} ${Inter500.className}`}
				>
					{subtitle}
				</div>
				{showError ? (
					<div className={`${formStyles.formInputErrorMessage}`}>
						{errorMessage ? errorMessage : ""}
					</div>
				) : (
					""
				)}
			</div>
			{children}
		</div>
	);
};

export const FormContainer = ({ children }) => {
	return (
		<form className={formStyles.formContainer} noValidate>
			{" "}
			{/* nu scoate 'noValidate'= face ca html sa nu valideze singur - ci vom valida programatic din react cu functii */}
			{children}
		</form>
	);
};

export const FormLink = ({ href = "#", children }) => {
	return (
		<Link
			href={href}
			className={`${formStyles.formLinkWrapper} ${formStyles.formLink} ${Inter500.className}`}
		>
			{children}
		</Link>
	);
};

export const FormButton = ({ onClick, children, disabled, className }) => {
	const buttonBehaviour = (event) => {
		event.preventDefault();
		if (disabled) {
			return;
		}
		onClick?.(event);
	};

	return (
		<button
			type={"submit"}
			onClick={buttonBehaviour}
			disabled={!!disabled}
			className={`${formStyles.formButton} border-rounded ${
				Inter600.className
			} ${disabled ? formStyles.formButtonDisabled : ""} ${className ? className : ""}`}
		>
			{children}
		</button>
	);
};

export const FormHollowButton = ({ onClick, children, disabled }) => {
	const buttonBehaviour = (event) => {
		event.preventDefault();
		if (disabled) {
			return;
		}
		onClick?.(event);
	};

	return (
		<button
			type={"submit"}
			onClick={buttonBehaviour}
			disabled={!!disabled}
			className={`${formStyles.formButton} border-rounded ${
				Inter500.className
			} ${formStyles.formHollowButton} ${
				disabled ? formStyles.formHollowButtonDisabled : ""
			}`}
		>
			{children}
		</button>
	);
};

export const FormMultiColumn = ({ cols, children }) => {
	return (
		<div
			className={`${formStyles.multiColumnContainer}`}
			style={{
				gridTemplateColumns: `repeat(${
					!isNaN(parseInt(cols)) ? cols : 2
				}, 1fr)`,
			}}
		>
			{children}
		</div>
	);
};
export const FormImageUploadMultiple = ({
	setState,
	label,
	validate = true,
}) => {
	const [preuploadFile, setPreuploadFile] = useState(null);

	const [imageLinks, setImageLinks] = useState([]);

	const [isUploading, setIsUploading] = useState(false);

	const [isInputError, setIsInputError] = useState(false);
	const [inputError, setInputError] = useState("");

	const handleImageUpload = async (e) => {
		setIsUploading(true);
		setInputError("");
		setIsInputError(false);
		let newLinks = [...imageLinks];
		if (!preuploadFile) {
			setInputError("Selectati o imagine");
			setIsInputError(true);
			return;
		}
		try {
			const formData = new FormData();
			formData.append("image", preuploadFile);
			formData.append("type", "file");
			formData.append("title", preuploadFile.name);
			formData.append("description", "Uploaded via Next.js app");

			const imageUrl = await uploadImage(formData);
			if (!imageUrl || imageUrl.length < 1) {
				setInputError("Eroare la upload imagine");
				setIsInputError(true);
				setIsUploading(false);
				return;
			}
			newLinks.push(imageUrl);
			setImageLinks(newLinks);
		} catch (error) {
			setInputError(error.message);
			setIsInputError(true);
			return;
		} finally {
			setIsUploading(false);
		}
	};

	useEffect(() => {
		console.log("Image links updated:", imageLinks);
		if (setState) {
			setState(imageLinks);
		}
	}, [imageLinks]);

	useEffect(() => {
		console.log("preuploadFile changed:", preuploadFile);
	}, [preuploadFile]);

	const handlePreuploadFileChange = (event) => {
		setPreuploadFile(event.target.files[0]);
		console.log("Preupload file changed:", event.target.files[0]);
	};

	return (
		<div
			className={classPack(
				formStyles.formImageUploadContainer,
				Inter600.className
			)}
		>
			<div>
				<div
					className={`${formStyles.formInputGroup} ${Inter600.className} ${formStyles.formImageUploadGroup}`}
				>
					<label>
						{label}
						<input
							className={`${
								formStyles.formInput
							} border-rounded border-gray ${
								Inter600.className
							} ${isInputError ? formStyles.formInputError : ""}`}
							type={"file"}
							onChange={handlePreuploadFileChange}
							accept={
								"image/png, image/jpeg, image/jpg, image/apng, image/gif, image/tiff"
							}
						/>
					</label>
					<FormButton
						disabled={isUploading}
						onClick={handleImageUpload}
					>
						Upload
					</FormButton>
					<div className={`${formStyles.formInputErrorMessage}`}>
						{validate && isInputError ? inputError : ""}
					</div>
				</div>
			</div>
			{imageLinks.length > 0 && (
				<ProductImageCarousel imageLinkArray={imageLinks} />
			)}
		</div>
	);
};

export const FormField = ({
	type,
	placeholder,
	validator,
	setState,
	trim,
	label,
	validate = true,
	formInputId,
	disabled,
	value,
}) => {
	const [inputValue, setInputValue] = useState(value || "");

	const [isInputError, setIsInputError] = useState(false);
	const [inputError, setInputError] = useState(null);

	const handleInputChange = (event) => {
		if (trim) setInputValue(event.target.value.trim());
		else setInputValue(event.target.value);
	};

	useEffect(() => {
		if (setState) setState(inputValue);
		if (!validate || !validator) return;

		let validationMessage = validator(inputValue);
		if (!validationMessage || validationMessage?.length < 1)
			setInputError(null);
		else setInputError(validationMessage);
	}, [inputValue, validate]);

	useEffect(() => {
		setIsInputError(!!inputError);
	}, [inputError]);

	return (
		<div className={`${formStyles.formInputGroup} ${Inter600.className}`}>
			<label>
				{label}
				{type == "textarea" ? (
					<textarea
						className={`${
							formStyles.formInput
						} border-rounded border-gray ${Inter600.className} ${
							isInputError ? formStyles.formInputError : ""
						}`}
						placeholder={placeholder}
						onChange={handleInputChange}
						id={formInputId}
						name={formInputId}
						value={inputValue}
						disabled={!!disabled}
					></textarea>
				) : (
					<input
						className={`${
							formStyles.formInput
						} border-rounded border-gray ${Inter600.className} ${
							isInputError ? formStyles.formInputError : ""
						}`}
						placeholder={placeholder}
						type={type}
						onChange={handleInputChange}
						id={formInputId}
						name={formInputId}
						value={inputValue}
						disabled={!!disabled}
					/>
				)}
			</label>
			<div className={`${formStyles.formInputErrorMessage}`}>
				{validate && isInputError ? inputError : ""}
			</div>
		</div>
	);
};

export const FormPreviewField = ({ type, placeholder, label, value }) => {
	return (
		<div className={`${formStyles.formInputGroup} ${Inter600.className}`}>
			<label>
				{label}
				<input
					className={`${formStyles.formInput} border-rounded border-gray ${Inter600.className} ${formStyles.formInputPreview}`}
					placeholder={placeholder}
					type={type}
					value={value}
					disabled
				/>
			</label>
		</div>
	);
};
