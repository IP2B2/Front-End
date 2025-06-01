'use client';

import React, { useState, useEffect } from 'react';

import { exampleDecodedEquipment } from "@/lib/service/EquipmentOps";
import { createEquipment, updateEquipmentById, getEquipmentById, deleteEquipmentById } from "@/lib/service/EquipmentService";

import { AccessRequestExample } from '@/lib/service/AccessRequestsOps';
import { createAccessRequest } from '@/lib/service/AccessRequestService';


import { getAuthToken } from '@/lib/getAuthToken';

export default function EquipmentServiceTestingPage() {

    const [equipment, setEquipment] = useState(exampleDecodedEquipment);
    const [idInput, setIdInput] = useState('');

    var date = new Date(new Date().setDate(new Date().getDate() + 1));
    date.setUTCHours(0, 0, 0, 0); // Set time to midnight
    var date2 = new Date(new Date().setDate(new Date().getDate() + 2));
    date2.setUTCHours(0, 0, 0, 0); // Set time to midnight

    const [accessRequest, setAccessRequest] = useState({
        equipmentId: 27,
        status: "PENDING",
        requestDate: date.toISOString(),
        expectedReturnDate: date2.toISOString(),
        requestType: "PHYSICAL",
        proposalFile: "proposal.pdf"
    });
    const [idAccessRequestInput, setIdAccessRequestInput] = useState('');

    const [authToken, setAuthToken] = useState('');
   
    useEffect(() => {
        const token = getAuthToken();
        setAuthToken(token);
    }, []);

    return (
        <div>
            <div>
                <h1>Equipment Service Testing Page</h1>
                <p>This page is used to test the EquipmentService functions.</p>
                <div>
                    <pre>{JSON.stringify(equipment, null, 2)}</pre>
                </div>
                <button
                    onClick={async () => {
                        try {
                            const response = await createEquipment(authToken, equipment);
                            setEquipment(response);
                            console.log("Equipment created successfully:", response);
                        } catch (error) {
                            console.error("Error creating equipment:", error);
                        }
                    }}
                >
                    Create Test Equipment
                </button>
                <input
                    type="text"
                    placeholder="Enter equipment ID"
                    value={idInput}
                    onChange={(e) => setIdInput(e.target.value)}
                />
                <button
                    onClick={async () => {
                        try {
                            const response = await getEquipmentById(authToken, idInput);
                            setEquipment(response);
                            console.log("Equipment retrieved successfully:", response);
                        } catch (error) {
                            console.error("Error retrieving equipment:", error);
                        }
                    }}
                >
                    Get Equipment
                </button>
                <button
                    onClick={async () => {
                        try {
                            await deleteEquipmentById(authToken, idInput);
                            setEquipment({});
                            console.log("Equipment deleted successfully");
                        } catch (error) {
                            console.error("Error deleting equipment:", error);
                        }
                    }}
                >
                    Delete Equipment
                </button>
                <button
                    onClick={async () => {
                        try {
                            const updatedEquipment = { ...equipment, availability: "IN_USE" };
                            const response = await updateEquipmentById(authToken, updatedEquipment);
                            setEquipment(response);
                            console.log("Equipment availability set to IN_USE:", response);
                        } catch (error) {
                            console.error("Error updating equipment availability:", error);
                        }
                    }}
                >
                    Set Availability to IN_USE
                </button>
            </div>
            <div>
                <h2>Access Request Service Testing</h2>
                <p>This section is used to test the AccessRequestService functions.</p>
                <div>
                    <pre>{JSON.stringify(accessRequest, null, 2)}</pre>
                </div>
                <button
                    onClick={async () => {
                        try {
                            const response = await createAccessRequest(authToken, accessRequest);
                            console.log("Access request created successfully:", response);
                        } catch (error) {
                            console.error("Error creating access request:", error);
                        }
                    }}
                >
                    Create Access Request
                </button>
            </div>
        </div>
    );
}