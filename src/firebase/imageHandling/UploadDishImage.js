// Importing the required stuff
import { storage } from '../config';
import { ref, uploadBytes } from 'firebase/storage';

const uploadDishImage = async (stallID, dishID, imageURL) => {
  const response = await fetch(imageURL);
  const blob = await response.blob();
  const fileType = imageURL.substring(imageURL.lastIndexOf('.'));
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
