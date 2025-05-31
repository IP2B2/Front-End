"use server";

import axios from "axios";
import { verifySession } from "../dal";

export const equipmentGetAll = async () => {
	"use server";
	try {
		const response = await axios.get(
			process.env.BACKEND_URI + "/equipment",
			{
				headers: {
					Authorization: `Bearer ${(await verifySession()).token}`,
				},
				validateStatus: (status) => {
					return status === 200 || status === 403 || status === 500;
				},
			}
		);
		if (response.status === 403) {
			return {
				success: false,
				status: 403,
				payload:
					"Nu aveti permisiunea necesara pentru a accesa aceasta resursa",
			};
		}
        if (response.status === 500) {
            return {
                success: false,
                status: 500,
                payload: response.data || "Eroare interna. Incercati mai tarziu",
            };
        }
        return {
            success: true,
            status: response.status || 200,
            payload: response.data,
        };
	} catch (error) {
		console.error("Error fetching equipment:", error);
		return {
			success: false,
			status: error.response?.status || 500,
			payload:
				error.response?.data?.message ||
				"Eroare de retea. Incercati mai tarziu",
			errorPayload: error,
		};
	}
};
