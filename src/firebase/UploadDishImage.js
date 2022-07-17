// Importing the required stuff
import { storage } from "./config";
import { ref, uploadBytes, uploadString } from "firebase/storage";

const uploadDishImage = (stallID, dishID, dataURI) => {
    const dishImageReference = ref(storage, 'dishes/' + stallID + '/' + dishID + '.jpeg');
    // uploadString(dishImageReference, dataURI, 'data_url');
    const bytes = dataURI.blob();
    uploadBytes(dishImageReference, bytes);
}

export default uploadDishImage;