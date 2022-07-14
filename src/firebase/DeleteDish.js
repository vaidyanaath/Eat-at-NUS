// Importing the required stuff
import { ref, remove } from "firebase/database";
import { db } from "./config";

const deleteDish = (stallID, dishID) => {

    // Deleting the data from dishes
    const dishReference = ref(db, 'dishes/' + dishID);
    remove(dishReference);

    // Deleting the data from dishesMetadata
    const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + dishID);
    remove(dishMetadataReference);

}

export default deleteDish;