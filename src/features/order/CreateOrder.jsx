import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant.js';
import { useState } from 'react';
import Button from '../../ui/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import store from '../../store.js';
import { formatCurrency } from '../../utilities/helpers.js';
import { fetchAdress } from '../user/userSlice.js';

// https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );
const isValidCzechPhone = (str) =>
  /^(\+420)\s\d{3}\s\d{3}\s\d{3}$/.test(str) ||
  /^(\+420)\d{3}\d{3}\d{3}$/.test(str);

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmiting = navigation.state === 'submitting';
  const formErrors = useActionData(); //it works for any data but mostly its used for errors
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const {
    username,
    status: adressStatus,
    position,
    adress,
    error: errorAdress,
  } = useSelector((state) => state.user);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const [withPriority, setWithPriority] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+420');
  const priorityPrice = withPriority ? Math.round(totalCartPrice * 0.2) : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isLoadingAdress = adressStatus === 'loading';

  function requestLocation(e) {
    e.preventDefault();

    dispatch(fetchAdress());
  }
  if (!cart) return <EmptyCart />;

  return (
    <div className="m-2 px-2 py-4">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-1/4 sm:text-lg">
            First Name:
          </label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow"
          />
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-1/4 sm:text-lg">
            Phone number:
          </label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="input w-full"
            />
            {formErrors?.phone && (
              <p className="mt-1 text-xs font-medium text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-medium sm:basis-1/4 sm:text-lg">
            Address:
          </label>

          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAdress}
              className="input w-full"
              required
              defaultValue={adress}
            />
            {adressStatus === 'error' && (
              <p className="mt-1 text-xs font-medium text-red-700">
                {errorAdress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-0 top-[0.04rem] z-10">
              <Button
                onClick={requestLocation}
                disabled={isLoadingAdress}
                type="location"
              >
                Get location
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-5">
          <input
            className="my-2 h-6 w-6 accent-yellow-400 focus:border-none focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.lonitude}`
                : ''
            }
          />
          <Button disabled={isSubmiting} type="cartButton">
            {isSubmiting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  // const formDataObj = Object.fromEntries(formData.entries()); tohle je spravne pouziti, rozdil je v tom, ze dolni zpusob vraci object instanci, tohle vraci an iterable of key-value pairs
  const formDataObj = Object.fromEntries(formData);
  const order = {
    ...formDataObj,
    cart: JSON.parse(formDataObj.cart),
    priority: formDataObj.priority === 'true',
  };

  const errors = {};
  if (!isValidCzechPhone(order.phone))
    errors.phone =
      'Please, write your phone number in the right form. (+420 123 456 789)';
  if (Object.keys(errors).length > 0) return errors;

  //if everything is OK, create new order and redirect
  const newOrder = await createOrder(order);

  store.dispatch(clearCart()); //we are dispatching right on store because we can use dispatch functions from our cartSlice only inside of components, never in a real function / this is a 'hack' and we shouldnt over use it

  return redirect(`/order/${newOrder.id}`); // We always need to return something
}

export default CreateOrder;
