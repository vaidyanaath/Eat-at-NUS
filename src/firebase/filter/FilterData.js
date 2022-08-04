// Importing the required stuff
import filterByName from "./filterByName";
import filterByCuisine from "./filterByCuisine";

const filterData = async (name, cuisines) => {
  const filteredNameResult = await filterByName(name);

  const finalResult = filterByCuisine(filteredNameResult, cuisines);

  return finalResult;
};

export default filterData;
