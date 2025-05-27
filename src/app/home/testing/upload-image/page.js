'use client';
import { useState } from "react";

import uploadImage from "./upload";

export default function Page() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setImageUrl("");
        if (!file) {
            setError("Please select an image.");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("type", "file");
            formData.append("title", file.name);
            formData.append("description", "Uploaded via Next.js app");

            const imageUrl = await uploadImage(formData);
            setImageUrl(imageUrl);
            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Upload Image</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setFile(e.target.files[0])}
                />
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
            {error && <p>{error}</p>}
            {imageUrl && (
                <div>
                    <p>Image uploaded:</p>
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                        <img src={imageUrl} alt="Uploaded" />
                    </a>
                </div>
            )}
        </div>
    );
}