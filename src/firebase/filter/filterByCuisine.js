const filterByCuisine = (nameResult, cuisines) => {
  const cuisineSet = new Set(cuisines);

  const dishNameResult = nameResult[0];
  const stallNameResult = nameResult[1];

  if (cuisineSet.size > 0) {
    let dishResult = [];
    let stallResult = [];

    dishNameResult.forEach((stall) => {
      if (cuisineSet.has(stall.cuisine)) {
        dishResult.push(stall);
      }
    });

    stallNameResult.forEach((stall) => {
      if (cuisineSet.has(stall.cuisine)) {
        stallResult.push(stall);
      }
    });

    return [dishResult, stallResult];
  } else {
    return [dishNameResult, stallNameResult];
  }
};

export default filterByCuisine;
