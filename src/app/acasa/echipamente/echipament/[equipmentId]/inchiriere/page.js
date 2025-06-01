"use client";

import styles from "./formInchiriere.module.css";
import { useState, useEffect } from "react";
import "@/app/globals.css";
import {
	DefaultFormLayout,
	FormContainer,
	FormMultiColumn,
	FormField,
} from "@/lib/components/form/Form";
import { redirect, useParams, usePathname, useRouter } from "next/navigation";
import {
	emptyInvalidator,
	cnpValidator,
	dateValidator,
	daysValidator,
} from "@/lib/logic/AuthValidators";
import { BackArrow } from "@/lib/components/globals/NavArrows";
import { useRootCalendar } from "@/lib/context";
import { createAccessRequest } from "@/lib/actions/accessRequestsActions";
import { getBusyDaysByEquipmentId } from "@/lib/actions/accessRequestsActions";
const today = new Date().toISOString().split("T")[0];

import { FormButton } from "@/lib/components/form/Form";

import { AvailabilityCalendar } from "@/lib/components/acasa/AvailabilityCalendar";
import { getEquipmentById } from "@/lib/actions/equipmentActions";

export default function ProductRentalForm() {
	const router = useRouter();

	const { equipmentId } = useParams();

	const [cnp, setCnp] = useState("");
	const [address, setAddress] = useState("");
	const [rentalDays, setRentalDays] = useState("");
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [rentalDate, setRentalDate] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsFormValid(
			cnpValidator(cnp) === "" &&
				emptyInvalidator(address) === "" &&
				daysValidator(rentalDays) === "" &&
				dateValidator(rentalDate) === ""
		);
	}, [cnp, address, rentalDays, rentalDate]);

	const [equipment, setEquipment] = useState(null);

	useEffect(() => {
		async function fetchEquipment() {
			const equipmentResolution = await getEquipmentById(equipmentId);
			if (!equipmentResolution.success) {
				console.error("Failed to fetch equipment:", equipmentResolution);
				return;
			}
			setEquipment(equipmentResolution.payload);
		}
		fetchEquipment();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		setHasSubmitted(true);

		try {
			if (!isFormValid) {
				return;
			}
			console.log("Form submitting");
			const startDate = new Date(rentalDate);
			const endDate = new Date(startDate);
			endDate.setDate(startDate.getDate() + parseInt(rentalDays, 10));

			let accReq = {
				equipmentId: equipmentId,
				status: "PENDING",
				requestDate: startDate.toISOString(),
				expectedReturnDate: endDate.toISOString(),
				proposalFile: "",
				borrowerCNP: cnp,
				borrowerAddress: address,
				requestType: "PHYSICAL",
			};
			accReq = await createAccessRequest(accReq);
			if (!accReq.success) {
				console.error("Failed to create access request:", accReq);
			} else  {
                console.log("Access request created successfully:", accReq);
                router.push("/acasa/echipamente/echipament/" + equipmentId);
			}
		} catch (error) {
			console.error("Error creating access request:", error);
		} finally {
			setIsLoading(false);
		}
	};
	const handleClear = () => {
		setCnp("");
		setAddress("");
		setRentalDays("");
		setRentalDate("");
		setHasSubmitted(false);
	};
	const [showCalendar, setShowCalendar] = useState(false);

	return (
		<div>
			<div className={styles.backButton}>
				<BackArrow arrowSize={20} />
			</div>

			<div className={styles.rentalWrapper}>
				<div className={styles.rentalContainer}>
					<DefaultFormLayout
						title={"Formular Închiriere Produs"}
						subtitle={
							"Completează formularul de mai jos pentru a închiria produsul"
						}
					>
						<FormContainer>
							<FormField
								type={"text"}
								label={"CNP"}
								placeholder={"Introduceți 13 cifre"}
								value={cnp}
								setState={setCnp}
								validator={cnpValidator}
								validate={hasSubmitted}
								maxLength={13}
							/>
							<FormField
								type={"text"}
								label={"Adresă de domiciliu"}
								placeholder={"ex: Strada Principala nr. 1"}
								value={address}
								setState={setAddress}
								validator={emptyInvalidator}
								validate={hasSubmitted}
							/>
							{/* <div className={styles.formButtonContainer}>
                                <button
                                    className={styles.calendarButton}
                                    onClick={(e) => {
                                        e?.preventDefault();
                                        setShowCalendar(!showCalendar);
                                    }}
                                    >
                                    Calendar disponibilitate produs
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                {showCalendar && <AbsoluteCalendar notAbsolute />}
                            </div> */}
							<div className={styles.calendarWrapper}>
								<AvailabilityCalendar
									equipmentId={equipmentId}
								/>
							</div>
							<FormMultiColumn cols={2}>
								<FormField
									type={"number"}
									label={"Număr de zile pentru închiriere"}
									placeholder={"Introduceți un număr"}
									value={rentalDays}
									setState={setRentalDays}
									validator={daysValidator}
									validate={hasSubmitted}
									min="1"
								/>
								<FormField
									type={"date"}
									label={"Data închiriere"}
									value={rentalDate}
									setState={setRentalDate}
									validator={dateValidator}
									validate={hasSubmitted}
									min={today}
									max="2050-12-31"
								/>
							</FormMultiColumn>

							{/* <div className={styles.calendarContainer}>
                                    <Calendar startDate={rentalDate} daysAdvance={rentalDays} />
                            </div> */}
							<div className={styles.buttonGroup}>
								<button
									className={styles.clearButton}
									onClick={handleClear}
									disabled={isLoading}
								>
									Golește
								</button>
								<FormButton
									className={`${styles.rentButton} ${
										isFormValid
											? styles.activeRentButton
											: ""
									}`}
									onClick={handleSubmit}
									disabled={isLoading}
								>
									Închiriază
								</FormButton>
							</div>
							{ equipment?.isComplex && 
								<div>Test</div>
							}
						</FormContainer>
					</DefaultFormLayout>
				</div>
			</div>
		</div>
	);
}
