// Importing the required stuff
import { useState } from "react";
import { storage } from "./config";
import { getDownloadURL, ref } from "firebase/storage";

const retrieveDishImage = (stallID, dishID) => {

    const [imageURL, setImageURL] = useState('');

    const dishImageReference = ref(storage, 'dishes/' + stallID + '/' + dishID + '.jpeg');
    const url = getDownloadURL(dishImageReference);
    setImageURL(url);

    return {url: imageURL};
}

export default retrieveDishImage;