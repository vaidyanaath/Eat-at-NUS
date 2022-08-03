// Importing the required stuff
import { useState, useEffect } from "react";

import { db } from "./config";
import { onValue, ref, query, orderByChild, equalTo } from "firebase/database";

const FilterData = (name, cuisines) => {

    const [stallIDs, setStallIDs] = useState(new Set());
    const [dishResult, setDishResult] = useState([]);
    const [stallResult, setStallResult] = useState([]);


    // Filtering by name

    // Finding stalls that serve the dish with the given name
    useEffect(() => {
        
        if (name != '') {
            const dishesReference = ref(db, 'dishes');
            const stallIDsQuery = query(dishesReference, orderByChild('name'), equalTo(name));
    
            onValue(stallIDsQuery, (snapshot) => {
                const stallIDsAnswer = new Set();
    
                snapshot.forEach((child) => {
                    stallIDsAnswer.add(child.val().stall);
                });
    
                setStallIDs(stallIDsAnswer);
    
            });
        }

    }, [db]);

    useEffect(() => {

        if (stallIDs.size > 0) {
            const stallsMetadataReference = ref(db, 'stallsMetadata');

            onValue(stallsMetadataReference, (snapshot) => {
                const stallsMetadataList = [];
    
                snapshot.forEach((child) => {
                    if (stallIDs.has(child.key)){
                        stallsMetadataList.push({
                            id: child.key,
                            name: child.val().name,
                            cuisine: child.val().cuisine,
                            rating: child.val().rating
                        });
                    }
                });
    
                setDishResult(stallsMetadataList);
    
            });
        }

    }, [db]);


    // Finding stalls with the given name
    useEffect(() => {
        
        if (name != '') {
            const stallsMetadataReference = ref(db, 'stallsMetadata');
            const stallNameQuery = query(stallsMetadataReference, orderByChild('name'), equalTo(name));
    
            onValue(stallNameQuery, (snapshot) => {
                const stallResultAnswer = [];
    
                snapshot.forEach((child) => {
                    stallResultAnswer.push({
                        id: child.key,
                        name: child.val().name,
                        cuisine: child.val().cuisine,
                        rating: child.val().rating
                    });
                });

                setStallResult(stallResultAnswer)
    
            });
        }

    }, [db]);


    // Filtering by cuisines

    useEffect(() => {
        
        if (cuisines != []) {
            const cuisineSet = new Set(cuisines);
            
            if (name == '') {
                const stallsMetadataReference = ref(db, 'stallsMetadata');                

                onValue(stallsMetadataReference, (snapshot) => {
                    const stallResultAnswer = [];

                    snapshot.forEach((child) => {
                        if (cuisineSet.has(child.val().cuisine)) {
                            stallResultAnswer.push({
                                id: child.key,
                                name: child.val().name,
                                rating: child.val().rating,
                                cuisine: child.val().cuisine
                            });
                        }
                    });
                });

            } else {
                const dishResultAnswer = [];
                const stallResultAnswer = [];

                dishResult.forEach((obj) => {
                    if (cuisineSet.has(obj.cuisine)) {
                        dishResultAnswer.push(obj);
                    }
                });

                stallResult.forEach((obj) => {
                    if (cuisineSet.has(obj.cuisine)) {
                        stallResultAnswer.push(obj);
                    }
                });

                setDishResult(dishResultAnswer);
                setStallResult(stallResultAnswer);
            }
        }
        
    }, [db]);
    console.log(dishResult);
    console.log(stallResult);

    return (<></>);

    // return [dishResult, stallResult];

}

export default FilterData;
