// Importing the required stuff
import { storage } from './config';
import { ref, uploadBytes, uploadString } from 'firebase/storage';

const uploadDishImage = (stallID, dishID, dataURI) => {
  const dishImageReference = ref(storage, 'dishes/' + stallID + '/' + dishID);
  // uploadString(dishImageReference, dataURI, 'data_url');
  const imgBlob = new Blob([dataURI]);
  uploadBytes(dishImageReference, imgBlob);
};

export default uploadDishImage;
