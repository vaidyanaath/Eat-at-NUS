// Importing the required stuff
import { ref, set } from "firebase/database";
import { db } from "./config";

const addUser = (userID, type) => {

    const userReference = ref(db, 'users/' + userID);
    set(userReference, type);

}

export default addUser;