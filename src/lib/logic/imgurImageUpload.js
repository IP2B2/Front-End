"use server";

import axios from "axios";
/**
 * Upload an image to Imgur
 * @param {FormData} formData - The form data containing the image to upload
 * @returns {Promise<string>} - The URL of the uploaded image
 * @throws {Error} - If the upload fails or the response is not successful
 */
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
        console.log("Imgur upload response:", response.data);
		if (response.data?.success !== true) {
            console.error("Imgur upload error:", response.data);
			throw new Error(response.data?.error || "Upload failed");
		}
		return response.data.data.link;
	} catch (error) {
        console.error("Imgur upload error catch:", error);
        if (error.response && error.response.data) {
			throw new Error(error.response.data.error || "An error occurred while uploading the image");
		}
	}
}
