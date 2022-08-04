// Importing the required stuff
import { db } from '../config';
import { ref, get, query, orderByChild } from 'firebase/database';

const filterByName = async (name) => {
  name = name.toLowerCase();

  // Stalls that serve the dish with the given name
  let dishNameResult = [];
  let stallIDs = new Set();

  // Stalls with the given name
  let stallNameResult = [];

  // If no name is entered, order all stalls by rating
  if (name == '') {
    const stallResultQuery = query(ref(db, 'stallsMetadata'), orderByChild('ratingIndex'));

    await get(stallResultQuery).then((snapshot) => {
      snapshot.forEach((child) => {
        stallNameResult.push({
          id: child.key,
          name: child.val().name,
          rating: child.val().rating,
          cuisine: child.val().cuisine,
          imageURL: child.val().imageURL,
        });
      });
    });
  } else {
    // Finding the stalls that serve the dish with the given name
    await get(ref(db, 'dishes')).then((snapshot) => {
      snapshot.forEach((child) => {
        if (child.val().name.toLowerCase().startsWith(name)) {
          stallIDs.add(child.val().stall);
        }
      });
    });

    if (stallIDs.size > 0) {
      const dishResultQuery = query(ref(db, 'stallsMetadata'), orderByChild('name'));
      await get(dishResultQuery).then((snapshot) => {
        snapshot.forEach((child) => {
          if (stallIDs.has(child.key)) {
            dishNameResult.push({
              id: child.key,
              name: child.val().name,
              rating: child.val().rating,
              cuisine: child.val().cuisine,
              imageURL: child.val().imageURL,
            });
          }
        });
      });
    }

    // Finding stalls with the given name
    const stallResultQuery = query(ref(db, 'stallsMetadata'), orderByChild('name'));
    await get(stallResultQuery).then((snapshot) => {
      snapshot.forEach((child) => {
        if (child.val().name.toLowerCase().startsWith(name)) {
          stallNameResult.push({
            id: child.key,
            name: child.val().name,
            rating: child.val().rating,
            cuisine: child.val().cuisine,
            imageURL: child.val().imageURL,
          });
        }
      });
    });
  }

  return [dishNameResult, stallNameResult];
};

export default filterByName;
