"use client";

import { useState, useEffect } from "react";

import SearchAndFilter from "@/lib/components/home/echipamente/SearchAndFilter";

import styles from "./adminUserPage.module.css";
import aulStyles from "./AdminUserListing.module.css";
import aumStyles from "./AdminUserModal.module.css";

import "@/app/globals.css";

import { getAllUsers, serviceApproveUser, deleteUser } from "@/lib/actions/userActions";
import { ModalContainer } from "@/lib/components/globals/ModalContainer";
import { FormButton, FormMultiColumn } from "@/lib/components/form/Form";


const collectionObject = {
	filterBy: {
		label: "Cont activ",
        an: "An Studii",
		grupa: "Grupa Studii",
	},
	items: [],
};

export default function AdministrareUtilizatoriPage() {
	const [users, setUsers] = useState(collectionObject);

    const [currentDecisionUser, setCurrentDecisionUser] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			const usersResolution = await getAllUsers();

			if (!usersResolution.success) {
				console.error(
					"Failed to fetch users:",
					usersResolution.payload
				); //FIXME add error show
				return;
			}
			console.log("Fetched users successfully:", usersResolution.payload);
			let newCollectionObject = {
				filterBy: collectionObject.filterBy,
				items:
					usersResolution.payload.map((user) => ({
						...user,
						name: `${user.firstName} ${user.lastName} ${user.username} ${user.email} ${user.nrMarca} ${user.facultate} ${user?.an} ${user?.grupa}`,
						rol: "Utilizator DEMO", //FIXME
						label:
							user.status == "active" ? "Aprobat" : "In asteptare",
						onClick: () => { console.log(user); setCurrentDecisionUser(user) },
                        user: user
					})) || [],
			};
			console.log("Fetched users:", newCollectionObject);
			setUsers(newCollectionObject);
		};
		fetchUsers();
	}, []);

	return (
		<div className={styles.container}>
            {currentDecisionUser && (
                <AdminUserDecisionModal user={currentDecisionUser} onClose={() => setCurrentDecisionUser(null)} />
            )}
			<SearchAndFilter
				title="Administrare Utilizatori"
				ItemComponent={AdminUserListing}
				collectionObject={users}
			/>
		</div>
	);
}

const AdminUserListing = ({
	firstName,
	lastName,
	username,
	email,
	facultate,
    an,
    grupa,
    nrMarca,
    status,
    label,
	onClick = () => {},
}) => {
	return (
		<div
			className={aulStyles.container}
			onClick={onClick}
		>
			<div>
				<div>Nume: {firstName}</div>
				<div>Prenume: {lastName}</div>
			</div>
			<div>
				<div>Username: {username}</div>
				<div>Email: {email}</div>
				<div>NrMarca: {nrMarca}</div>
			</div>
			<div>
				<div>Facultate: {facultate}</div>
                <div>An: {an ? an : "NU E STUDENT"}</div>
                <div>Grupa: {grupa ? grupa : "NU E STUDENT"}</div>
			</div>
            <div>
                <div className={aulStyles.label + ' ' + (status == 'active' ? aulStyles.greenLabel : aulStyles.redLabel)}>
                    {label}
                </div>
            </div>
		</div>
	);
};

const AdminUserDecisionModal = ({ user, onClose }) => {

	const [isLoading, setIsLoading] = useState(false);

	const handleAccept = async () => {
		setIsLoading(true);
		try {
			console.log("Approving user:", user.id);
			const userAcceptResolution = await serviceApproveUser(user.id);
	
			if (!userAcceptResolution.success) {
				console.error("Failed to approve user:", userAcceptResolution);
			}
		} catch (error) {
			console.error("Error approving user:", error);
		} finally {
			setIsLoading(false);
			onClose();
		}
	};
	const handleReject = async () => {
		setIsLoading(true);
		try {
			console.log("Deleting user:", user.id);
			const userDeleteResolution = await deleteUser(user.id);
			if (!userDeleteResolution.success) {
				console.error("Failed to delete user:", userDeleteResolution);
			}
		} catch (error) {
			console.error("Error deleting user:", error);
		} finally {
			setIsLoading(false);
			onClose();
		}
	};

    return (
        <ModalContainer>
            <div className={aumStyles.adminUserDecision}>
				<div className={aumStyles.modalCloseButton} onClick={onClose}>
						&times;
				</div>
				<div>Decizie user: {user.email}</div>
				<FormMultiColumn>
					<FormButton onClick={handleAccept}
						disabled={isLoading}>
						Aproba
					</FormButton>
					<FormButton onClick={handleReject}
						disabled={isLoading}>
						Sterge
					</FormButton>
				</FormMultiColumn>
			</div>
        </ModalContainer>
    );
}