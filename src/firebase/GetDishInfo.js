// Importing Database
import { ref, onValue } from 'firebase/database';
import { db } from './config';
import React, { useState, useEffect } from 'react';



// const getDishInfo = (dishID) => {

//     const reference = ref(db, 'dishes/' + dishID);
//     onValue(reference, (snapshot) => {
//         const data = snapshot.val();
//         setArray(data);
//     });

//     return dishInfoArr;
// }



const getDishInfo = (dishId) => {
    const[dishInfo, setDishInfo] = useState();

    useEffect(() => {
        const reference = ref(db, 'dishes/' + dishId);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            setDishInfo(data);
        });
    }, []);

    return dishInfo;
}


export default getDishInfo;