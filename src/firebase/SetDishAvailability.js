// Importing the required stuff
import { ref, update } from "firebase/database";
import { db } from "./config";

const setDishAvailability = (stallID, dishID, value) => {

    // Updating the data in dishes
    const dishReference = ref(db, 'dishes/' + dishID + '/availability');
    update(dishReference, value);

    // Updating the data in dishesMetadata
    const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + dishID + '/availability');
    update(dishMetadataReference, value);

}

export default setDishAvailability;