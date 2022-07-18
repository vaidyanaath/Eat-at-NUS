// Importing the required stuff
import { ref, update } from "firebase/database";
import { db } from "./config";

const setDishAvailability = (stallID, dishID, value) => {

    // Updating the data in dishes
    const dishReference = ref(db, 'dishes/' + dishID);
    update(dishReference, { availability: value });

    // Updating the data in dishesMetadata
    const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + dishID);
    update(dishMetadataReference, { availability: value });

}

export default setDishAvailability;