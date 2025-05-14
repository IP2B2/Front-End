
import { FormPreviewField } from "@/lib/components/form/FormPreviewField";
import styles from "./cererePreview.module.css";

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const PreviewCerereSimplu = ({
    borrowerName,
    startDate,
    returnDate,
    equipmentName,
    accessType
}) => {
    console.log(formatDate(Date.now()));
    return (
        <div className={styles.accessRequestPreviewWrapper}>
            <FormPreviewField
                type={"text"}
                label={"Nume utilizator"} 
                value={borrowerName}
                disabled/>
            <FormPreviewField
                type={"text"}
                label={"Nume echipament"}
                value={equipmentName}
            />
            <FormPreviewField
                type={"text"}
                label={"Tip acces"}
                value={accessType}
            />
            <FormPreviewField
                type={"date"}
                label={"Data Incepere inchiriere"}
                value={formatDate(startDate)}
            />
            <FormPreviewField
                type={"date"}
                label={"Data Finalizare inchiriere"}
                value={formatDate(returnDate)}
            />
        </div>
    )
}