

import { PreviewCerereSimplu } from "@/lib/components/home/PreviewCerere";

import styles from "./cererePreview.module.css";

export default function CererePreviewPage() {
    return (
        <div>
            <h1>Preview Cerere</h1>
            <p>Aici va fi afisata cererea de inchiriere.asdfads</p>
            <div className={styles.cerereWrapper}>
                <PreviewCerereSimplu
                    startDate={Date.now()}
                    returnDate={Date.now()
                        + 1000 * 60 * 60 * 24 * 7} // +7 zile
                    equipmentName={"Laptop"}
                    borrowerName={"Popescu Andrei"}
                    accessType={"Fizic"} />
            </div>
        </div>
    );
}