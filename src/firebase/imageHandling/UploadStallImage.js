// Importing the required stuff
import { db, storage } from '../config';
import { ref, update } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadStallImage = async (stallID, imageURI) => {
  const response = await fetch(imageURI);
  const blob = await response.blob();
  const fileType = imageURI.substring(imageURI.lastIndexOf('.'));
  const stallImageFilePath = 'stalls/' + stallID + fileType;

  let stallImageURL = '';

  const stallImageReference = storageRef(storage, stallImageFilePath);
  await uploadBytes(stallImageReference, blob)
    .then((snapshot) => {
      console.log('Uploaded'); // To check if the function is executed
    })
    .catch((error) => {
      console.log(error);
    });

  await getDownloadURL(storageRef(storage, stallImageFilePath)).then((url) => {
    stallImageURL = url;
  });

  // Updating the data in stalls
  const stallReference = ref(db, 'stalls/' + stallID);
  update(stallReference, {
    imageURL: stallImageURL,
  });

  // Updating the data in stallsMetadata
  const stallMetadataReference = ref(db, 'stallsMetadata/' + stallID);
  update(stallMetadataReference, {
    imageURL: stallImageURL,
  });
};

export default uploadStallImage;
