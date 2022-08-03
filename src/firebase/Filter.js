import { db } from './config';
import { onValue, ref, query, orderByChild, equalTo } from 'firebase/database';

const filter = (name, cuisines) => {
  let stallIDs = new Set();
  let dishResult = [];
  let stallResult = [];

  // Filtering by name

  // Finding stalls that serve the dish with the given name

  if (name != '') {
    const dishesReference = ref(db, 'dishes');
    const stallIDsQuery = query(dishesReference, orderByChild('name'), equalTo(name));

    onValue(stallIDsQuery, (snapshot) => {
      const stallIDsAnswer = new Set();
      snapshot.forEach((child) => {
        stallIDsAnswer.add(child.val().stall);
      });
      stallIDs = stallIDsAnswer;
    });
  }

  if (stallIDs.size > 0) {
    const stallsMetadataReference = ref(db, 'stallsMetadata');

    onValue(stallsMetadataReference, (snapshot) => {
      const stallsMetadataList = [];
      snapshot.forEach((child) => {
        if (stallIDs.has(child.key)) {
          stallsMetadataList.push({
            id: child.key,
            name: child.val().name,
            cuisine: child.val().cuisine,
            rating: child.val().rating,
          });
        }
      });
      dishResult = stallsMetadataList;
    });
  }

  // Finding stalls with the given name
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
          rating: child.val().rating,
        });
      });
      stallResult = stallResultAnswer;
    });
  }

  // Filtering by cuisines
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
              cuisine: child.val().cuisine,
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

      dishResult = dishResultAnswer;
      stallResult = stallResultAnswer;
    }
  }

  return [dishResult, stallResult];
};

export default filter;
