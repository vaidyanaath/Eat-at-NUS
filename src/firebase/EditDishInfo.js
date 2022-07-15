// Importing the required stuff
import { ref, update } from "firebase/database";
import { db } from "./config";

const editDishInfo = (stallID, dishID, name, price, description, calories, allergenInfo, imageURL) => {

    // Updating the data in dishes
    const dishReference = ref(db, 'dishes/' + dishID);
    update(dishReference, {
        name: name,
        price: price,
        description: description,
        calories: calories,
        allergenInfo: allergenInfo,
        imageURL: imageURL
    });

    // Updating the data in dishesMetadata
    const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + dishID);
    update(dishMetadataReference, {
        name: name,
        price: price,
        imageURL: imageURL
    });
    
}

export default editDishInfo;