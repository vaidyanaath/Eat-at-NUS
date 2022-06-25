// Importing Database
import { ref, onValue } from 'firebase/database';
import { db } from './config';

let dishInfoArr;

const setArray = (data) => {
    dishInfoArr = Object.values(data);
}

const getDishInfo = (dishID) => {

    const reference = ref(db, 'dishes/' + dishID);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        setArray(data);
    });

    return dishInfoArr;
}

export default getDishInfo;