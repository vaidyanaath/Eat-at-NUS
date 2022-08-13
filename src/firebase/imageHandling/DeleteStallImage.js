// Importing the required stuff
import { db, storage } from '../config';
import { ref, get, update } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';

const deleteStallImage = async (stallID) => {
  let fileType = '';
  let imageExists = true;

  await get(ref(db, 'stalls/' + stallID + '/imageURL')).then((snapshot) => {
    const stallImageURL = snapshot.val();
    // There is no image for specified stall
    console.log('ImageURL', stallImageURL);
    if (stallImageURL === '') {
      console.log("Given dish doesn't have an image in firebase storage");
      imageExists = false;
    } else {
      fileType = stallImageURL.slice(
        stallImageURL.lastIndexOf('.'),
        stallImageURL.lastIndexOf('?')
      );
    }
  });

  if (!imageExists) {
    return;
  }

  const stallImageFilePath = 'stalls/' + stallID + fileType;

  await deleteObject(storageRef(storage, stallImageFilePath)).catch((error) => {
    console.log(error);
  });

  // Updating the data in stalls
  update(ref(db, 'stalls/' + stallID), {
    imageURL: '',
  });

  // Updating the data in stallsMetadata
  update(ref(db, 'stallsMetadata/' + stallID), {
    imageURL: '',
  });
};

export default deleteStallImage;
