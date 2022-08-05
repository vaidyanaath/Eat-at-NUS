// Importing the required stuff
import { ref, remove } from 'firebase/database';
import { db } from './config';
import deleteDishImage from './imageHandling/DeleteDishImage';

const deleteDish = async (stallID, dishID) => {
  // Delete dish image from firebase storage if it has an image
  await deleteDishImage(stallID, dishID);

  const dishReference = ref(db, 'dishes/' + dishID);
  await remove(dishReference);

  const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + dishID);
  await remove(dishMetadataReference);
};

export default deleteDish;
