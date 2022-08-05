// Importing the required stuff
import { push, ref, set } from 'firebase/database';
import { db } from './config';
import uploadDishImage from './imageHandling/UploadDishImage';

const addDish = async (stallID, name, price, description, calories, allergenInfo, dishImageURI) => {
  // Adding the data to dishes
  const dishesReference = ref(db, 'dishes');
  const newdishReference = push(dishesReference);
  const newDishID = newdishReference.key;

  await set(newdishReference, {
    name: name,
    price: price,
    description: description,
    calories: calories,
    imageURL: '',
    allergenInfo: allergenInfo,
    stall: stallID,

    // Setting availability to false when a new dish is added
    // Food Stall Owner has to make it available after adding
    availability: false,

    // Average Rating = 0 => No Ratings Yet
    rating: 0,
    ratingIndex: 0,

    numRatings: 0,
    totalRating: 0,
  });

  // Adding the data to dishesMetadata
  const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + newDishID);

  await set(dishMetadataReference, {
    name: name,
    price: price,
    rating: 0,
    imageURL: '',
    availability: false,
  });

  if (dishImageURI) {
    await uploadDishImage(stallID, newDishID, dishImageURI);
  }
};

export default addDish;
