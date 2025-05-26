

export const exampleDecodedEquipment = {
    id: 27,
    name: "nume",
    inventoryNumber: "TST999",
    availabilityStatus: "AVAILABLE",
    laboratoryId: 1,
    accessRequirements: {
        description: "desc",
        usage: "mod",
        material: "123"
    },
    photo: [
        "https://i.imgur.com/lfOaCyU.png",
        "https://i.imgur.com/aqCMBq1.png"
    ],
    acquisitionDate: "2025-05-25"
}

export const exampleEncodedEquipment = {
    "id": 27,
    "name": "nume",
    "inventoryNumber": "TST999",
    "availabilityStatus": "AVAILABLE",
    "laboratoryId": 1,
    "accessRequirements": "{\"description\":\"desc\",\"usage\":\"mod\",\"material\":\"123\"}",
    "photo": "[\"https://i.imgur.com/lfOaCyU.png\",\"https://i.imgur.com/aqCMBq1.png\"]",
    "acquisitionDate": "2025-05-25"
}
export function decodeEquipmentObject(encodedEquipment) {
    // console.log("decodeEquipmentObject called with encodedEquipment:", encodedEquipment);
    let photo = [];
    try {
        photo = JSON.parse(encodedEquipment.photo);
    } catch (error) {
        photo = [];
    }

    let decodedEquipment = {
        id: encodedEquipment.id,
        name: encodedEquipment.name,
        inventoryNumber: encodedEquipment.inventoryNumber,
        availabilityStatus: encodedEquipment.availabilityStatus,
        laboratoryId: encodedEquipment.laboratoryId,
        accessRequirements: encodeEquipmentObject.accessRequirements,
        photo: photo,
        acquisitionDate: encodedEquipment.acquisitionDate
    };

    try {
        decodedEquipment.description = JSON.parse(encodedEquipment.accessRequirements).description || '';
        decodedEquipment.usage = JSON.parse(encodedEquipment.accessRequirements).usage || '';
        decodedEquipment.material = JSON.parse(encodedEquipment.accessRequirements).material || '';
    } catch (error) {
        decodedEquipment.description = '';
        decodedEquipment.usage = '';
        decodedEquipment.material = '';
    }
    if(!decodedEquipment.description) {
        decodedEquipment.description = '';
    }
    if(!decodedEquipment.usage) {
        decodedEquipment.usage = '';
    }
    if(!decodedEquipment.material) {
        decodedEquipment.material = '';
    }
    // console.log("decodedEquipment:", decodedEquipment);
    return decodedEquipment;
}
export function encodeEquipmentObject(decodedEquipment) {
    // console.log("encodeEquipmentObject called with decodedEquipment:", decodedEquipment);
    let encodedEquipment = {
        id: decodedEquipment.id,
        name: decodedEquipment.name,
        inventoryNumber: decodedEquipment.inventoryNumber,
        availabilityStatus: decodedEquipment.availabilityStatus,
        laboratoryId: decodedEquipment.laboratoryId,
        accessRequirements: '',
        photo: JSON.stringify(decodedEquipment.photo),
        acquisitionDate: decodedEquipment.acquisitionDate
    };
    encodedEquipment.accessRequirements = JSON.stringify({
        description: decodedEquipment.description,
        usage: decodedEquipment.usage,
        material: decodedEquipment.material
    });
    console.log(JSON.stringify({
        description: decodedEquipment.description,
        usage: decodedEquipment.usage,
        material: decodedEquipment.material
    }));
    // console.log("encodedEquipment:", encodedEquipment);
    return encodedEquipment;
}