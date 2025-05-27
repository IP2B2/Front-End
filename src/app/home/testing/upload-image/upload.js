"use server";

import axios from "axios";

export default async function uploadImage(formData) {
	try {
        const response = await axios.post(
            "https://api.imgur.com/3/image",
            formData,
            {
                headers: {
                    Authorization: "Client-ID " + process.env.IMGUR_CLIENT_ID,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
		if (response.data?.success !== true) {
			throw new Error(response.data?.error || "Upload failed");
		}
		return response.data.link;
	} catch (error) {
        if (error.response && error.response.data) {
			throw new Error(error.response.data.error || "An error occurred while uploading the image");
		}
	}
}
