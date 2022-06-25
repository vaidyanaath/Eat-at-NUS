// Importing Database
import { ref, onValue } from 'firebase/database';
import { db } from './config';

let stallInfoArr;

const setArray = (data) => {
    stallInfoArr = Object.values(data);
}

const getStallInfo = (stallID) => {

    const reference = ref(db, 'stalls/' + stallID);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        setArray(data);
    });

    return stallInfoArr;
}

export default getStallInfo;