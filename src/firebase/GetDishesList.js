// Importing Database
import { ref, onValue } from 'firebase/database';
import { db } from './config';

let dishesListArr;

const setArray = (data) => {
    dishesListArr = Object.values(data);

    for (let i = 0; i < dishesListArr.length; i++) {
        dishesListArr[i] = Object.values(dishesListArr[i]);
    }
}

const getDishesList = (stallID) => {

    const reference = ref(db, 'dishesMetadata/' + stallID);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        setArray(data);
    });

    return dishesListArr;
}

export default getDishesList;