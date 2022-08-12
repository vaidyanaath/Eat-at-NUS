// Importing the required stuff
import { ref, remove } from 'firebase/database';
import { db } from './config';
import deleteDishImage from './imageHandling/DeleteDishImage';

const deleteDish = async (stallID, dishID) => {
  // Delete dish image from firebase storage if it has an image
  await deleteDishImage(stallID, dishID);

  // Delete dish from dishes
  const dishReference = ref(db, 'dishes/' + dishID);
  await remove(dishReference);

  // Delete dish from dishesMetadata
  const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + dishID);
  await remove(dishMetadataReference);

  // Delete all reviews for the dish
  const dishReviewsReference = ref(db, 'reviews/' + dishID);
  await remove(dishReviewsReference);
};

export default deleteDish;
