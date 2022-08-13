// Importing the required stuff
import { db } from '../config';
import { ref, get, remove } from 'firebase/database';
import deleteDish from '../DeleteDish';

const deleteCustomer = async (user) => {
  // Delete user from userType
  const emailID = user.email.toLowerCase().replace('.', '%2E');
  const userTypeReference = ref(db, 'userType/' + emailID);
  await remove(userTypeReference);

  // Delete user from users
  const userReference = ref(db, 'users/' + user.uid);
  await remove(userReference);
};

const deleteFoodStallOwner = async (user) => {
  // Delete user from userType
  const emailID = user.email.toLowerCase().replace('.', '%2E');
  const userTypeReference = ref(db, 'userType/' + emailID);
  await remove(userTypeReference);

  // Delete user from users
  const userReference = ref(db, 'users/' + user.uid);
  await remove(userReference);

  // Get the list of dishes belonging to the user's stall
  let dishesList = [];
  const dishesListReference = ref(db, 'dishesMetadata/' + user.uid);
  await get(dishesListReference).then((snapshot) => {
    snapshot.forEach((child) => {
      dishesList.push(child.key);
    });
  });

  // Delete all the dishes belonging to the user's stall
  dishesList.forEach((dishID) => {
    deleteDish(user.uid, dishID);
  });

  // Delete stall from stalls
  await remove(ref(db, 'stalls/' + user.uid));

  // Delete stall from stallsMetadata
  await remove(ref(db, 'stallsMetadata/' + user.uid));
};

const deleteUser = async (user) => {
  let userType = '';
  const emailID = user.email.toLowerCase().replace('.', '%2E');
  const userTypeReference = ref(db, 'userType/' + emailID);
  await get(userTypeReference).then((snapshot) => {
    userType = snapshot.val();
  });

  if (userType == 'customer') {
    await deleteCustomer(user);
  } else {
    await deleteFoodStallOwner(user);
  }
};

export default deleteUser;
