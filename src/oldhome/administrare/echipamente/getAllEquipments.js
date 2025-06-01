'use server'
import axios from 'axios';

export async function getAllEquipments(data) {
    try {
        console.log("Data received in getAllEquipments:", data);
        const response = await axios.get(process.env.BACKEND_URI + `/equipment`, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        const responseLabs = await axios.get(process.env.BACKEND_URI + `/laboratories`, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        const updatedEquipments = response.data.map(equipment => {
            let lab = responseLabs.data.find(lab => lab.id === equipment.laboratoryId);
            if (lab) {
                equipment.labName =  lab.labName + ' - ' + lab.location; // Assuming lab has a 'name' property
            } else {
                equipment.labName = 'EROARE'; // Fallback if lab not found
            }
            return equipment;
        });
        console.log("Updated equipments:", updatedEquipments);
        return updatedEquipments;
    } catch (error) {
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            throw new Error(`Error: ${error.response.data.message ||    'Unknown error'}`);
        } else {
            throw new Error('Network error or server not reachable');
        }
    }
  }