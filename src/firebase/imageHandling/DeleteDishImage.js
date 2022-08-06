// Importing the required stuff
import { db, storage } from '../config';
import { ref, get, update } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';

const deleteDishImage = async (stallID, dishID) => {
  let fileType = '';
  let imageExists = true;

  await get(ref(db, 'dishes/' + dishID + '/imageURL')).then((snapshot) => {
    const dishImageURL = snapshot.val();
    // There is no image for specified dish
    console.log('ImageURL', dishImageURL);
    if (dishImageURL === '') {
      console.log("Given dish doesn't have an image in firebase storage");
      imageExists = false;
    } else {
      fileType = dishImageURL.slice(dishImageURL.lastIndexOf('.'), dishImageURL.lastIndexOf('?'));
    }
  });

  if (!imageExists) {
    return;
  }

  const dishImageFilePath = 'dishes/' + stallID + '/' + dishID + fileType;

  await deleteObject(storageRef(storage, dishImageFilePath)).catch((error) => {
    console.log(error);
  });

  // Updating the data in dishes
  update(ref(db, 'dishes/' + dishID), {
    imageURL: '',
  });

  // Updating the data in dishesMetadata
  update(ref(db, 'dishesMetadata/' + stallID + '/' + dishID), {
    imageURL: '',
  });
};

export default deleteDishImage;
