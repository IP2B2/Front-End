

import { FormField } from "@/lib/components/form/Form";

import styles from "./cererePreview.module.css";

export default function CererePreviewPage() {
    return (
        <div>
            <h1>Preview Cerere</h1>
            <p>Aici va fi afisata cererea de inchiriere.asdfads</p>
            <div className={styles.cerereWrapper}>
                <PreviewCerere />
            </div>
        </div>
    );
}

const PreviewCerere = () => {
    return (
        <div>
            <FormField
                type={"text"}
                label={"Nume utilizator"} 
                placeholder={"Popescul Andrei"}
                disabled/>
            <FormField
                type={"date"}
                label={"Data Incepere inchiriere"} disabled
                placeholder={new Date()}
                />
            <FormField
                type={"date"}
                label={"Data Finalizare inchiriere"} disabled/>
            
        </div>
    )
}