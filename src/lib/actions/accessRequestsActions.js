"use server";
import axios from "axios";

import { getSessionToken } from "@/lib/getSessionToken";

import { getEquipmentById } from "@/lib/actions/equipmentActions";
import { getLaboratoryById } from "./laboratoryActions";

import { getDaysBetweenDates } from "@/lib/logic/DateTypeLogic";

export const getAccessRequests = async () => {
	"use server";
	try {
		const token = await getSessionToken();

		if (!token) {
			return {
				success: false,
				status: 401,
				payload: "Nu sunteti autentificat",
			};
		}

		const response = await axios.get(
			process.env.BACKEND_URI + "/access-requests",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				validateStatus: (status) => {
					return (
						status === 200 ||
						status === 401 ||
						status === 403 ||
						status === 500
					);
				},
			}
		);

		if (response.status === 401) {
			return {
				success: false,
				status: 401,
				payload: "Sesiune expirata. Reautentificati-va",
			};
		}

		if (response.status === 403) {
			return {
				success: false,
				status: 403,
				payload: "Nu aveti permisiuni pentru aceasta operatiune",
			};
		}

		if (response.status === 500) {
			return {
				success: false,
				status: 500,
				payload: "Eroare interna. Incercati mai tarziu",
			};
		}

		return {
			success: true,
			status: response.status || 200,
			payload: response.data,
		};
	} catch (error) {
		console.error("getAccessRequests error:", error);
		return {
			success: false,
			status: error.response?.status || 500,
			payload:
				error.response?.data?.error ||
				"An error occurred while fetching access requests",
		};
	}
};

export const getEnrichedAccessRequests = async () => {
	"use server";

	const token = await getSessionToken();

	if (!token) {
		return {
			success: false,
			status: 401,
			payload: "Nu sunteti autentificat",
		};
	}

	const accessRequests = await getAccessRequests();
	if (!accessRequests.success) {
		return accessRequests; // Return the error response directly
	}
	const enrichedAccessRequests = await Promise.all(
		accessRequests?.payload?.map(async (request) => {
			let equipment = await getEquipmentById(request.equipmentId);
			request.equipment = equipment.payload || null;
			let user;
			try {
				user = await axios.get(
					process.env.BACKEND_URI +
						"/accessRequests/" +
						request.id +
						"/user",
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
						validateStatus: (status) => {
							return status === 200;
						},
					}
				);
				user = user.data || null;
			} catch (error) {
				console.log("userId:", request.userId);
				console.log("request.id:", request.id);
				// console.error("enrichedAccessRequests - user error:", error);
				// console.error("enrichedAccessRequests - user error:", error.response);
			}
			request.user = user || null;
			if(request.equipment?.laboratoryId) {
				let laboratory = await getLaboratoryById(
					request.equipment?.laboratoryId
				);
				console.log("laboratory:", request.equipment?.laboratoryId);
				request.equipment.laboratory = laboratory.success
				? laboratory.payload
				: null;
			}
			return request;
		})
	);
	//console.log("enrichedAccessRequests:", enrichedAccessRequests);
	// if (enrichedAccessRequests.some((req) => !req.equipment || !req.user)) {
	// 	return {
	// 		success: false,
	// 		status: 500,
	// 		payload:
	// 			"Eroare la obtinerea echipamentelor sau utilizatorilor asociati cererilor de acces",
	// 	};
	// }
	return {
		success: true,
		status: 200,
		payload: enrichedAccessRequests,
	};
};

export const serviceApproveAccessRequest = async (accessRequestId) => {
	"use server";
	try {
		const token = await getSessionToken();

		if (!token) {
			return {
				success: false,
				status: 401,
				payload: "Nu sunteti autentificat",
			};
		}

		const response = await axios.patch(
			process.env.BACKEND_URI + "/access-requests/" + accessRequestId,
			{
				status: "APPROVED",
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				validateStatus: (status) => {
					return (
						status === 200 ||
						status === 400 ||
						status === 401 ||
						status === 403 ||
						status === 500
					);
				},
			}
		);
		if (response.status === 400) {
			return {
				success: false,
				status: 400,
				payload: response.data,
			};
		}

		if (response.status === 401) {
			return {
				success: false,
				status: 401,
				payload: "Sesiune expirata. Reautentificati-va",
			};
		}

		if (response.status === 403) {
			return {
				success: false,
				status: 403,
				payload: "Nu aveti permisiuni pentru aceasta operatiune",
			};
		}

		if (response.status === 500) {
			return {
				success: false,
				status: 500,
				payload: "Eroare interna. Incercati mai tarziu",
			};
		}

		return {
			success: true,
			status: response.status || 200,
			payload: response.data,
		};
	} catch (error) {
		console.error("serviceApproveAccessRequest error:", error);
		return {
			success: false,
			status: error.response?.status || 500,
			payload:
				error.response?.data?.error ||
				"An error occurred while approving the access request",
		};
	}
};

export const serviceRejectAccessRequest = async (accessRequestId) => {
	"use server";
	try {
		const token = await getSessionToken();

		if (!token) {
			return {
				success: false,
				status: 401,
				payload: "Nu sunteti autentificat",
			};
		}
		console.log(
			"serviceRejectAccessRequest - accessRequestId:",
			accessRequestId
		);
		const response = await axios.patch(
			process.env.BACKEND_URI + "/access-requests/" + accessRequestId,
			{
				status: "REJECTED",
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				validateStatus: (status) => {
					return (
						status === 200 ||
						status === 400 ||
						status === 401 ||
						status === 403 ||
						status === 500
					);
				},
			}
		);
		if (response.status === 400) {
			return {
				success: false,
				status: 400,
				payload: response.data,
			};
		}

		if (response.status === 401) {
			return {
				success: false,
				status: 401,
				payload: "Sesiune expirata. Reautentificati-va",
			};
		}

		if (response.status === 403) {
			return {
				success: false,
				status: 403,
				payload: "Nu aveti permisiuni pentru aceasta operatiune",
			};
		}

		if (response.status === 500) {
			return {
				success: false,
				status: 500,
				payload: "Eroare interna. Incercati mai tarziu",
			};
		}

		return {
			success: true,
			status: response.status || 200,
			payload: response.data,
		};
	} catch (error) {
		console.error("serviceRejectAccessRequest error:", error);
		return {
			success: false,
			status: error.response?.status || 500,
			payload:
				error.response?.data?.error ||
				"An error occurred while rejecting the access request",
		};
	}
};

export const getBusyDaysByEquipmentId = async (equipmentId) => {
    "use server";
    try {
        const accReqsResolution = await getAccessRequestsByEquipmentId(equipmentId);
        if (!accReqsResolution.success) {
            console.error("getBusyDaysByEquipmentId error:", accReqsResolution);
            return {
                success: false,
                status: accReqsResolution.status,
                payload: accReqsResolution.payload,
            };
        }
        const busyDays = accReqsResolution.payload
            .filter((request) => request.status === "APPROVED")
            .flatMap((request) => {
                const startDate = new Date(request.requestDate);
                const endDate = new Date(request.expectedReturnDate);
                return getDaysBetweenDates(startDate, endDate);
            });
        return {
            success: true,
            status: 200,
            payload: busyDays,
        };
    } catch (error) {
        console.error("getBusyDaysByEquipmentId error:", error);
        return {
            success: false,
            status: error.response?.status || 500,
            payload:
                error.response?.data?.error ||
                "An error occurred while fetching busy days by equipment ID",
        };
    }

}

export const getAccessRequestsByEquipmentId = async (equipmentId) => {
	"use server";
	try {
		const token = await getSessionToken();
		if (!token) {
			return {
				success: false,
				status: 401,
				payload: "Nu sunteti autentificat",
			};
		}

		const response = await axios.get(
			`${process.env.BACKEND_URI}/equipments/${equipmentId}/accessRequests`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
			{
				validateStatus: (status) => {
					return (
						status === 200 ||
						status === 401 ||
						status === 403 ||
						status === 500
					);
				},
			}
		);
		if (response.status === 401) {
			return {
				success: false,
				status: 401,
				payload: "Sesiune expirata. Reautentificati-va",
			};
		}

        if (response.status === 403) {
            return {
                success: false,
                status: 403,
                payload: "Nu aveti permisiuni pentru aceasta operatiune",
            };
        }
        if (response.status === 500) {
            return {
                success: false,
                status: 500,
                payload: "Eroare interna. Incercati mai tarziu",
            };
        }
        return {
            success: true,
            status: response.status || 200,
            payload: response.data._embedded.accessRequests || [],
        }

	} catch (error) {
		console.error("getAccessRequestsByEquipmentId error:", error);
		return {
			success: false,
			status: error.response?.status || 500,
			payload:
				error.response?.data?.error ||
				"An error occurred while fetching access requests by equipment ID",
		};
	}
};

export const getMyAccessRequests = async () => {
	"use server";
	try {
		const token = await getSessionToken();

		if (!token) {
			return {
				success: false,
				status: 401,
				payload: "Nu sunteti autentificat",
			};
		}

		const response = await axios.get(
			process.env.BACKEND_URI + "/my-access-requests",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				validateStatus: (status) => {
					return (
						status === 200 ||
						status === 401 ||
						status === 403 ||
						status === 500
					);
				},
			}
		);

		if (response.status === 401) {
			return {
				success: false,
				status: 401,
				payload: "Sesiune expirata. Reautentificati-va",
			};
		}

		if (response.status === 403) {
			return {
				success: false,
				status: 403,
				payload: "Nu aveti permisiuni pentru aceasta operatiune",
			};
		}

		if (response.status === 500) {
			return {
				success: false,
				status: 500,
				payload: "Eroare interna. Incercati mai tarziu",
			};
		}

		return {
			success: true,
			status: response.status || 200,
			payload: response.data,
		};
	} catch (error) {
		console.error("getMyAccessRequests error:", error);
		return {
			success: false,
			status: error.response?.status || 500,
			payload:
				error.response?.data?.error ||
				"An error occurred while fetching your access requests",
		};
	}
};

export const getEnrichedMyAccessRequests = async () => {
		"use server";

	const token = await getSessionToken();

	if (!token) {
		return {
			success: false,
			status: 401,
			payload: "Nu sunteti autentificat",
		};
	}

	const accessRequests = await getMyAccessRequests();
	if (!accessRequests.success) {
		return accessRequests; // Return the error response directly
	}
	const enrichedAccessRequests = await Promise.all(
		accessRequests?.payload?.map(async (request) => {
			let equipment = await getEquipmentById(request.equipmentId);
			request.equipment = equipment.payload || null;
			let user;
			try {
				user = await axios.get(
					process.env.BACKEND_URI +
						"/accessRequests/" +
						request.id +
						"/user",
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
						validateStatus: (status) => {
							return status === 200;
						},
					}
				);
				user = user.data || null;
			} catch (error) {
				console.log("userId:", request.userId);
				console.log("request.id:", request.id);
				// console.error("enrichedAccessRequests - user error:", error);
				// console.error("enrichedAccessRequests - user error:", error.response);
			}
			request.user = user || null;
			if(request.equipment?.laboratoryId) {
				let laboratory = await getLaboratoryById(
					request.equipment?.laboratoryId
				);
				console.log("laboratory:", request.equipment?.laboratoryId);
				request.equipment.laboratory = laboratory.success
				? laboratory.payload
				: null;
			}
			return request;
		})
	);
	//console.log("enrichedAccessRequests:", enrichedAccessRequests);
	// if (enrichedAccessRequests.some((req) => !req.equipment || !req.user)) {
	// 	return {
	// 		success: false,
	// 		status: 500,
	// 		payload:
	// 			"Eroare la obtinerea echipamentelor sau utilizatorilor asociati cererilor de acces",
	// 	};
	// }
	return {
		success: true,
		status: 200,
		payload: enrichedAccessRequests,
	};
}


export const getAccessRequestById = async (accessRequestId) => {};

export const createAccessRequest = async (accessRequestData) => {
	"use server";
	try {
		const token = await getSessionToken();

		if (!token) {
			return {
				success: false,
				status: 401,
				payload: "Nu sunteti autentificat",
			};
		}

		const response = await axios.post(
			process.env.BACKEND_URI + "/access-requests",
			accessRequestData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				validateStatus: (status) => {
					return (
						status === 201 ||
						status === 400 ||
						status === 401 ||
						status === 403 ||
						status === 500
					);
				},
			}
		);

		if (response.status === 400) {
			return {
				success: false,
				status: 400,
				payload: response.data,
			};
		}

		if (response.status === 401) {
			return {
				success: false,
				status: 401,
				payload: "Sesiune expirata. Reautentificati-va",
			};
		}

		if (response.status === 403) {
			return {
				success: false,
				status: 403,
				payload: "Nu aveti permisiuni pentru aceasta operatiune",
			};
		}

		if (response.status === 500) {
			return {
				success: false,
				status: 500,
				payload: "Eroare interna. Incercati mai tarziu",
			};
		}

		return {
			success: true,
			status: response.status || 201,
			payload: response.data,
		};
	} catch (error) {
		console.error("createAccessRequest error:", error);
		return {
			success: false,
			status: error.response?.status || 500,
			payload:
				error.response?.data?.error ||
				"An error occurred while creating the access request",
		};
	}
};

export const updateAccessRequest = async (
	accessRequestId,
	accessRequestData
) => {};

export const deleteAccessRequest = async (accessRequestId) => {};
