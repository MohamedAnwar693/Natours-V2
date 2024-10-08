/* eslint-disable */

import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe('pk_test_51P9RmkBpbwAlU0UVkkpGcXBWzN9p8GrIpIDDF3ANEzXh9okjNZCDFxfFq6waotLk7fQ8BMI0aCWo1TJdscZOcfuF00peJCKgvu');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
