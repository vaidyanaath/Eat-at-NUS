// Importing the required stuff
import { db } from '../config';
import { ref, get, remove } from 'firebase/database';
import { deleteUser as firebaseDeleteUser } from 'firebase/auth';
import deleteDish from '../DeleteDish';

const deleteUser = (user) => {
  Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: async () => {
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

        // Delete user from firebase auth system
        firebaseDeleteUser(user).catch((error) => {
          console.log(error);
        });
      },
    },
  ]);
};

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

export default deleteUser;
