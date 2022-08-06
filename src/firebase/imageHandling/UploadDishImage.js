// Importing the required stuff
import { db, storage } from '../config';
import { ref, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadDishImage = async (stallID, dishID, imageURI) => {
  const response = await fetch(imageURI);
  const blob = await response.blob();
  const fileType = imageURI.substring(imageURI.lastIndexOf('.'));
  const dishImageFilePath = 'dishes/' + stallID + '/' + dishID + fileType;

  let dishImageURL = '';

  const dishImageReference = storageRef(storage, dishImageFilePath);
  await uploadBytes(dishImageReference, blob)
    .then((snapshot) => {
      console.log('Uploaded'); // To check if the function is executed
    })
    .catch((error) => {
      console.log(error);
    });

  await getDownloadURL(storageRef(storage, dishImageFilePath)).then((url) => {
    dishImageURL = url;
  });

  // Updating the data in dishes
  const dishReference = ref(db, 'dishes/' + dishID);
  update(dishReference, {
    imageURL: dishImageURL,
  });

  // Updating the data in dishesMetadata
  const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + dishID);
  update(dishMetadataReference, {
    imageURL: dishImageURL,
  });
};

export default uploadDishImage;
