"use client";

import { useState, useEffect } from "react";

import styles from "./ProductEditModal.module.css";
import {
	DefaultFormLayout,
	FormButton,
	FormField,
	FormHollowButton,
	FormMultiColumn,
} from "@/lib/components/form/Form";
import { emptyInvalidator } from "@/lib/logic/AuthValidators";
import {
	updateEquipment,
	getEquipmentById,
    deleteEquipment,
} from "@/lib/actions/equipmentActions";

import { ModalContainer } from "./ModalContainer";

export const ProductEditModal = ({ equipmentId, onClose }) => {
	const [eqName, setEqName] = useState("");
	const [eqInventoryNumber, setEqInventoryNumber] = useState("");
	const [eqLaboratoryId, setEqLaboratoryId] = useState("");
    const [eqAvailabilityStatus, setEqAvailabilityStatus] = useState("AVAILABLE");


	const [eqAcquisitionDate, setEqAcquisitionDate] = useState("");

	const [eqDescription, setEqDescription] = useState("");
	const [eqUsage, setEqUsage] = useState("");
	const [eqMaterial, setEqMaterial] = useState("");

	const [eqIsComplex, setEqIsComplex] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const fetchEquipment = async () => {
			const response = await getEquipmentById(equipmentId);
			if (response.success) {
				const equipment = response.payload;
				console.log("Fetched equipment:", equipment);
				setEqName(equipment.name);
				setEqInventoryNumber(equipment.inventoryNumber);
				setEqLaboratoryId(equipment.laboratoryId);
                setEqAvailabilityStatus(equipment.availabilityStatus);
				setEqAcquisitionDate(equipment.acquisitionDate);
				setEqDescription(equipment.description);
				setEqUsage(equipment.usage);
				setEqMaterial(equipment.material);
				setEqIsComplex(equipment.isComplex);
			}
			setIsLoading(false);
		};
		fetchEquipment();
	}, [equipmentId]);

	const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSave = async (event) => {
		//event.preventDefault();
		setIsSaving(true);

		try {
            const equipmentData = {
				name: eqName || "",
                availabilityStatus: eqAvailabilityStatus || "AVAILABLE",
                laboratoryId: eqLaboratoryId,
				inventoryNumber: eqInventoryNumber || "",
				description: eqDescription || "",
				usage: eqUsage || "",
				material: eqMaterial || "",
				isComplex: eqIsComplex || "",
			};
            console.log("Saving equipment data:", equipmentData);
			const response = await updateEquipment(equipmentId, equipmentData);
			if (response.success) {
				console.log("Equipment updated successfully:", response);
                setIsError(false);
                setErrorMessage("");
                onClose();
			} else {
                setIsError(true);
                setErrorMessage(response.payload);
            }
		} catch (error) {
			console.error("Error updating equipment:", error);
		} finally {
			setIsSaving(false);
		}
	};

    const handleDelete = async (event) => {
        // event.preventDefault();
        setIsDeleting(true);
        try {
            // Assuming you have a deleteEquipment function
            const response = await deleteEquipment(equipmentId);
            if (response.success) {
                console.log("Equipment deleted successfully:", response);
                setIsError(false);
                setErrorMessage("");
                onClose();
            } else {
                setIsError(true);
                setErrorMessage(response.payload);
            }
        } catch (error) {
            console.error("Error deleting equipment:", error);
            setIsError(true);
            setErrorMessage(error.message || "An error occurred while deleting the equipment.");
        } finally {
            setIsDeleting(false);
        }
    };

	return (
		<ModalContainer>
			<div className={styles.productEditModal}>
				<div className={styles.popupCloseButton} onClick={onClose}>
					&times;
				</div>
				{!isLoading && (
					<DefaultFormLayout
						title={"Editeaza echipament #" + equipmentId}
						showError={isError}
						errorMessage={errorMessage}
					>
						<FormField
							type={"text"}
							label={"Nume"}
							value={eqName}
							validator={emptyInvalidator}
							setState={setEqName}
							trim={true}
							formInputId={"eqName"}
							placeholder={"Introduceți numele echipamentului"}
						/>
						<FormField
							type={"text"}
							label={"Număr de inventar"}
							value={eqInventoryNumber}
							validator={emptyInvalidator}
							setState={setEqInventoryNumber}
							trim={true}
							formInputId={"eqInventoryNumber"}
							placeholder={"Introduceți numărul de inventar"}
						/>
						<FormField
							type={"number"}
							label={"ID Laborator"}
							value={eqLaboratoryId}
							validator={emptyInvalidator}
							setState={setEqLaboratoryId}
							trim={true}
							formInputId={"eqLaboratoryId"}
							placeholder={"Introduceți ID-ul laboratorului"}
						/>
						<FormField
							type={"textarea"}
							label={"Descriere"}
							validator={emptyInvalidator}
							value={eqDescription}
							setState={setEqDescription}
							trim={true}
							formInputId={"eqDescription"}
							placeholder={
								"Introduceți descrierea echipamentului"
							}
						/>
						<FormField
							type={"textarea"}
							label={"Utilizare"}
							validator={emptyInvalidator}
							value={eqUsage}
							setState={setEqUsage}
							trim={true}
							formInputId={"eqUsage"}
							placeholder={
								"Introduceți utilizarea echipamentului"
							}
						/>
						<FormField
							type={"textarea"}
							label={"Material"}
							validator={emptyInvalidator}
							value={eqMaterial}
							setState={setEqMaterial}
							trim={true}
							formInputId={"eqMaterial"}
							placeholder={
								"Introduceți materialul echipamentului"
							}
						/>
						<FormMultiColumn>
							<FormButton
								disabled={isSaving}
								onClick={handleSave}
							>
								Salvează
							</FormButton>
							<FormHollowButton
                                disabled={isDeleting}
                                onClick={handleDelete}
                            >
								Sterge
							</FormHollowButton>
						</FormMultiColumn>
					</DefaultFormLayout>
				)}
				{isLoading && (
					<div className={styles.loadingMessage}>
						<p>Încărcare echipament...</p>
					</div>
				)}
			</div>
		</ModalContainer>
	);
};
