import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Gr61JIrHTylEkxfu5mWGXaLEvwHGslDNfqXXbXBzY7C3xpGPnOrrexgEQBrFSX7YSwTXGWUo6aWxONIw3dO40FD00KMfCAUMS'
);

export const bookTour = async tourId => {
  try {
    //1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    //2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (error) {
    showAlert('error', error);
  }
};
