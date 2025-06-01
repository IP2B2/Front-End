'use server'
import axios from 'axios';

export async function getEquipmentById(data) {
    try {
        console.log("Data received in getEquipmentById:", data);
        const response = await axios.get(process.env.BACKEND_URI + `/equipment/` + data.id, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        const responseLab = await axios.get(process.env.BACKEND_URI + `/equipments/` + data.id + '/laboratory', {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        let updatedEquipment = response.data;
        updatedEquipment.description = JSON.parse(updatedEquipment.accessRequirements).description || '';
        updatedEquipment.usage = JSON.parse(updatedEquipment.accessRequirements).usage || '';
        updatedEquipment.material = JSON.parse(updatedEquipment.accessRequirements).material || '';
        updatedEquipment.photo = JSON.parse(updatedEquipment.photo) || [];
        if (responseLab.data) {
            updatedEquipment.labName = responseLab.data.labName + ' - ' + responseLab.data.location;
        }
        else {
            updatedEquipment.labName = 'EROARE'; // Fallback if lab not found
        }
        console.log("Updated equipment:", updatedEquipment);
        return updatedEquipment;
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