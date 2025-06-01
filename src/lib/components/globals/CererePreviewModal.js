'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

import { ModalContainer } from "./ModalContainer";

import styles from "./CererePreviewModal.module.css";
import { FormButton, FormMultiColumn, FormPreviewField } from "../form/Form";

import "@/app/globals.css";
import { useRootContext } from "@/lib/context/RootContext";
import { serviceApproveAccessRequest, serviceRejectAccessRequest } from "@/lib/actions/accessRequestsActions";

export const CererePreviewModal = ({ enrichedRequestData, onClose }) => {

	const { setShowNavbar } = useRootContext();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setShowNavbar(false);
		return () => {
			setShowNavbar(true);
		};
	}, []);

	const handleAccept = async () => {
		setLoading(true);
		const resolution = await serviceApproveAccessRequest(enrichedRequestData.id);
		if (resolution.success) {
			alert("Cererea a fost acceptata cu succes!");
			onClose();
		} else {
			alert("A aparut o eroare la acceptarea cererii: " + resolution.payload);
		}
		setLoading(false);
	};
	const handleReject = async () => {
		setLoading(true);
		const resolution = await serviceRejectAccessRequest(enrichedRequestData.id);
		if (resolution.success) {
			alert("Cererea a fost respinsa cu succes!");
			onClose();
		} else {
			alert("A aparut o eroare la respingerea cererii: " + resolution.payload);
		}
		setLoading(false);
	};

	return (
		<ModalContainer>
			<div className={styles.cererePreviewContainer}>
				<div className={styles.header}>
					<div>Cerere #{enrichedRequestData.id} {enrichedRequestData.equipment?.isComplex ? '- Complex': ''}</div>
					<div className={styles.modalCloseButton} onClick={onClose}>
						&times;
					</div>
				</div>
				<FormPreviewField
					type="text"
					placeholder="Nume echipament"
					label="Echipament"
					value={enrichedRequestData.equipment?.name || "N/A"}
				/>
				<Link
					target={"_blank"}
					href={`/acasa/echipamente/echipament/${enrichedRequestData.equipment?.id}`}
					rel={"noopener noreferrer"}
				>
					<FormButton>Pagina Echipament</FormButton>
				</Link>
				<FormMultiColumn>
					<FormPreviewField
						type="text"
						placeholder="Prenume"
						label="Prenume"
						value={enrichedRequestData.user?.firstName || "N/A"}
					/>
					<FormPreviewField
						type="text"
						placeholder="Nume"
						label="Nume"
						value={enrichedRequestData.user?.lastName || "N/A"}
					/>
				</FormMultiColumn>
				<FormPreviewField
					type="text"
					placeholder=""
					label="Email"
					value={enrichedRequestData.user?.email || "N/A"}
				/>
				<FormMultiColumn>
					<FormPreviewField
						type="text"
						placeholder=""
						label="Numar Marca"
						value={enrichedRequestData.user?.nrMarca || "N/A"}
					/>
					<FormPreviewField
						type="text"
						placeholder=""
						label="Facultate Utilizator"
						value={enrichedRequestData.user?.facultate || "N/A"}
					/>
				</FormMultiColumn>
				<FormMultiColumn>
					<FormPreviewField
						type="text"
						placeholder=""
						label="an"
						value={enrichedRequestData.user?.an || "N/A"}
					/>
					<FormPreviewField
						type="text"
						placeholder=""
						label="grupa"
						value={enrichedRequestData.user?.grupa || "N/A"}
					/>
				</FormMultiColumn>
				<FormMultiColumn>
					<FormPreviewField
						type="text"
						placeholder=""
						label="Data Start"
						value={enrichedRequestData.requestDate || "N/A"}
					/>
					<FormPreviewField
						type="text"
						placeholder=""
						label="Data Returnare"
						value={enrichedRequestData.expectedReturnDate || "N/A"}
					/>
				</FormMultiColumn>
				<FormMultiColumn>
					<FormButton
						className={styles.rejectButton}
						onClick={handleReject}
						disabled={loading}
					>
						Respinge
					</FormButton>
					<FormButton
						className={styles.acceptButton}
						onClick={handleAccept}
						disabled={loading}
					>
						Accepta
					</FormButton>
				</FormMultiColumn>
			</div>
		</ModalContainer>
	);
};
