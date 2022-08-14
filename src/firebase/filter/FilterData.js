// Importing the required stuff
import { db } from '../config';
import { ref, get, query, orderByChild } from 'firebase/database';

const filterByName = async (name) => {
  name = name.toLowerCase();

  // Dishes with the given name
  let dishNameResult = [];

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
    // Finding dishes with the given name
    const dishResultQuery = query(ref(db, 'dishes'), orderByChild('name'));
    await get(dishResultQuery).then((snapshot) => {
      snapshot.forEach((child) => {
        if (child.val().name.toLowerCase().startsWith(name)) {
          dishNameResult.push({
            id: child.key,
            name: child.val().name,
            price: child.val().price,
            availability: child.val().availability,
            rating: child.val().rating,
            imageURL: child.val().imageURL,
          });
        }
      });
    });

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

const filterByCuisine = (nameResult, cuisines) => {
  const cuisineSet = new Set(cuisines);

  const dishNameResult = nameResult[0];
  const stallNameResult = nameResult[1];

  // Filter name-filtered stalls by cuisine
  if (cuisineSet.size > 0) {
    let stallResult = [];

    stallNameResult.forEach((stall) => {
      if (cuisineSet.has(stall.cuisine)) {
        stallResult.push(stall);
      }
    });

    return [dishNameResult, stallResult];
  } else {
    return [dishNameResult, stallNameResult];
  }
};

const filterData = async (name, cuisines) => {
  const filteredNameResult = await filterByName(name);

  const finalResult = filterByCuisine(filteredNameResult, cuisines);

  return finalResult;
};

export default filterData;
