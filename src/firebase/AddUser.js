// Importing the required stuff
import { ref, set } from 'firebase/database';
import { db } from './config';

const addUser = (user, type) => {
  const email = user.email.replace('.', '%2E');

  // Add user to db
  const userReference = ref(db, 'users/' + user.uid);
  set(userReference, {
    name: user.displayName,
    email: email,
  });

  // Store user type
  const userTypeReference = ref(db, 'userType/' + email);
  set(userTypeReference, type);
};

export default addUser;
