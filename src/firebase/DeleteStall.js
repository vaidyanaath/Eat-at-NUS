// Importing the required stuff
import { onValue, ref, remove } from "firebase/database";
import { db } from "./config";
import deleteDish from "./DeleteDish";

// const deleteStall = (stallID) => {
  
//     onValue(ref(db, 'dishesMetadata/' + stallID), (snapshot) => {
//         const data = snapshot.val();
//         const dishIDs = Object.keys(data);
        
//         for (let i  = 0; i < dishIDs.length; i++) {
//           deleteDish(stallID, dishIDs[i]);
//         }
//     })
  
//     // Deleting the data from stalls
//     const stallReference = ref(db, 'stalls/' + stallID);
//     remove(stallReference);
  
//     // Deleting the data from stallsMetadata
//     const stallMetadataReference = ref(db, 'stallsMetadata/' + stallID);
//     remove(stallMetadataReference);
    
//   }

const deleteStall = () => {}

export default deleteStall;