// Importing the required stuff
import { ref, update } from "firebase/database";
import { db } from "./config";

const editStallInfo = (stallID, name, address, openingTime, closingTime, cuisine) => {

    // Updating the data in stalls
    const stallReference = ref(db, 'stalls/' + stallID);
    update(stallReference, {
        name: name,
        address: address,
        openingTime: openingTime,
        closingTime: closingTime,
        cuisine: cuisine
    });

    // Updating the data in stallsMetadata
    const stallMetadataReference = ref(db, 'stallsMetadata/' + stallID);
    update(stallMetadataReference, {
        name: name,
        cuisine: cuisine
    });

}

export default editStallInfo;