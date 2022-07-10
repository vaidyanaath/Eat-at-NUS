// Importing the required stuff
import { ref, remove } from "firebase/database";
import { db } from "./config";

const deleteStall = (stallID) => {

    // Deleting the data from stalls
    const stallReference = ref(db, 'stalls/' + stallID);
    remove(stallReference);

    // Deleting the data from stallsMetadata
    const stallMetadataReference = ref(db, 'stallsMetadata/' + stallID);
    remove(stallMetadataReference);
    
}

export default deleteStall;