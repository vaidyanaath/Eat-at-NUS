// Importing the required stuff
import { push, ref, set } from "firebase/database";
import { db } from "./config";

const addDish = (stallID, name, price, description, calories, allergenInfo) => {

    // Adding data to dishes
    const dishesReference = ref(db, 'dishes')
    const newdishReference = push(dishesReference);
    const newDishID = newdishReference.key;

    set(newdishReference, {
        name: name,
        price: price,
        description: description,
        calories: calories,
        availability: false,
        allergenInfo: allergenInfo,
        averageRating: 0,
        numberOfRatings: 0
    })

    // Adding data to dishesMetadata
    const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + newDishID);

    set(dishMetadataReference, {
        name: name,
        price: price,
        averageRating: 0,
        availability: false
    })
}

export default addDish;