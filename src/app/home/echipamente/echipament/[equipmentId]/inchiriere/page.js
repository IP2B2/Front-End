'use client';

import styles from './formInchiriere.module.css';
import { useState, useEffect } from "react";
import '@/app/globals.css';
import { DefaultFormLayout, FormContainer, FormMultiColumn, FormField } from "@/lib/components/form/Form";
import { redirect, useParams, usePathname} from 'next/navigation'; 
import { Calendar } from '@/lib/components/calendar/Calendar';
import { useRouter } from 'next/navigation';
import { emptyInvalidator, cnpValidator, dateValidator, daysValidator } from "@/lib/logic/AuthValidators";
import { BackArrow } from "@/lib/components/globals/NavArrows";
import { CheckIsLoggedInAndRedirect, redirectToLogin } from '@/lib/logic/RedirectLogin';
import { createCerereInchiriereSimplu } from '@/lib/logic/ApiCalls/InchiriereCalls';
import { useRootCalendar } from '@/lib/context';
import { getAuthToken } from '@/lib/getAuthToken';
import { createAccessRequest, getAccessRequestsByEquipmentId } from '@/lib/service/AccessRequestService';
import { getDaysBetweenDates, AbsoluteCalendar } from '../page';
const today = new Date().toISOString().split("T")[0];

export default function ProductRentalForm() {
    const router = useRouter();

    // useEffect(() => {
    //     CheckIsLoggedInAndRedirect(router);
    // }, []);
    const { equipmentId } = useParams();
    const { pathname } = usePathname();

    const { setUnavailableDates, unavailableDates } = useRootCalendar();

    useEffect(() => {
        async function fetchEquipment() {
            const authToken = getAuthToken();

            const accData = await getAccessRequestsByEquipmentId(authToken, equipmentId);
            console.log("Fetched Access Requests:", accData);

            const unavailableDates = accData.map((request) => {
                if (request.status === "APPROVED") {
                    return getDaysBetweenDates(
                        new Date(request.requestDate),
                        new Date(request.expectedReturnDate)
                    );
                }
            }).flat().filter(date => date !== undefined);
            console.log("Unavailable Dates:", unavailableDates);
            setUnavailableDates(unavailableDates);
        }
        fetchEquipment();
    }, []);

    useEffect(() => {
        console.log("Current path:", pathname);
    }, [pathname]);

    const [cnp, setCnp] = useState("");
    const [address, setAddress] = useState("");
    const [rentalDays, setRentalDays] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [rentalDate, setRentalDate] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(
            cnpValidator(cnp) === "" &&
            emptyInvalidator(address) === "" &&
            daysValidator(rentalDays) === "" &&
            dateValidator(rentalDate) === ""
        );
    }, [cnp, address, rentalDays, rentalDate]);

    //const selectDayContext = useSelectedDay();

    useEffect(() => {
        //selectDayContext.setSelectedDay(rentalDate);
        
    }, [rentalDate, rentalDays]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setHasSubmitted(true);
        
        if(!isFormValid) {
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
            proposalFile: JSON.stringify({
                cnp: cnp,
                address: address,
                file: 'notprovided'
            })
        }
        accReq = await createAccessRequest(getAuthToken(), accReq);
        console.log("Access Request Created:", accReq);

        router.push('/acasa/');
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
                        subtitle={"Completează formularul de mai jos pentru a închiria produsul"}>
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
                            <div className={styles.formButtonContainer}>
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
                                {showCalendar && <AbsoluteCalendar notAbsolute/>}
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
                                >
                                    Golește
                                </button>
                                <button
                                    className={`${styles.rentButton} ${isFormValid ? styles.activeRentButton : ''}`}
                                    onClick={handleSubmit}
                                >
                                    Închiriază
                                </button>
                            </div>
                        </FormContainer>
                    </DefaultFormLayout>
                </div>
            </div>
        </div>
    );
}