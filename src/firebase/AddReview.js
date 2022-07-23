// Importing the required stuff
import { push, ref, set, update, get } from 'firebase/database';
import { db } from './config';

const addReview = (dishID, stallID, rating, review, author) => {
  const dishReviewReference = ref(db, 'reviews/' + dishID);
  const newReviewReference = push(dishReviewReference);

  // Adding review under dish
  set(newReviewReference, {
    author: author,
    review: review,
    rating: rating,
    timeStamp: Date.now(),
  }).catch((error) => {
    console.log(error);
  });

  // Update dish (number of ratings), (total rating), (average rating)
  const dishDataReference = ref(db, 'dishes/' + dishID);
  const dishMetadataReference = ref(db, 'dishesMetadata/' + stallID + '/' + dishID);

  // Get rating info
  get(dishDataReference).then((snapshot) => {
    const data = snapshot.val();
    const numRatings = data.numRatings;
    const totalRating = data.totalRating;

    const newNumRatings = numRatings + 1;
    const newTotalRating = totalRating + rating;
    const avgRating = Math.round((newTotalRating / newNumRatings) * 10) / 10;

    // Update rating info
    update(dishDataReference, {
      numRatings: newNumRatings,
      totalRating: newTotalRating,
      rating: avgRating,
      ratingIndex: -avgRating,
    });

    // Update average rating of dish in its metadata
    update(dishMetadataReference, {
      rating: avgRating,
    });
  });
};

export default addReview;
