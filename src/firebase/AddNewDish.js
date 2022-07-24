// Importing the required stuff
import { push, ref, set } from 'firebase/database';
import { db } from './config';
import uploadDishImage from './UploadDishImage';

const addDish = (stallID, name, price, description, calories, allergenInfo, dishImageURL) => {
  // Adding the data to dishes
  const dishesReference = ref(db, 'dishes');
  const newdishReference = push(dishesReference);
  const newDishID = newdishReference.key;

  set(newdishReference, {
    name: name,
    price: price,
    description: description,
    calories: calories,
    imageURL: '',
    allergenInfo: allergenInfo,
    stall: stallID,

    // Setting availability to false when a new dish is added
    // Food Stall Owners have to make it available after adding
    availability: false,

    // Average Rating = 0 => No Ratings Yet
    rating: 0,
    ratingIndex: 0,

    numRatings: 0,
    totalRating: 0,
  });

  // Adding the data to dishesMetadata
  const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + newDishID);

  set(dishMetadataReference, {
    name: name,
    price: price,
    rating: 0,
    imageURL: '',
    availability: false,
  });

  // uploadDishImage(stallID, newDishID, dishImageURL);
};

export default addDish;
