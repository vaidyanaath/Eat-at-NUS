// Importing the required stuff
import { storage } from './config';
import { ref as storageRef, uploadBytes, uploadString } from 'firebase/storage';

const uploadDishImage = async (stallID, dishID, imageURL) => {
  const response = await fetch(imageURL);
  const blob = await response.blob();
  const fileType = imageURL.substring(imageURL.lastIndexOf('.'));
  const dishImageFilePath = 'dishes/' + stallID + '/' + dishID + fileType;

  const dishImageReference = storageRef(storage, dishImageFilePath);
  await uploadBytes(dishImageReference, blob)
    .then((snapshot) => {
      console.log("Uploaded dish image successfully");
    })
    .catch((error) => {
      console.log("Didnt upload");
      console.log(error);
    });
};

export default uploadDishImage;
