// Importing Database
import { ref, onValue } from 'firebase/database';
import { db } from './config';

let stallsMetadataArr;

const setArray = (data) => {
    stallsMetadataArr = Object.values(data);
}

const getStallsMetadata = () => {
    
    const reference = ref(db, 'stallsMetadata/');
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        setArray(data);
    });

    return stallsMetadataArr;
}

export default getStallsMetadata;