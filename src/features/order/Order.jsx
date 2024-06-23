// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant.js';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utilities/helpers';

import OrderItem from './OrderItem.jsx';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder.jsx';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  return (
    <div className="m-2 space-y-8 px-2 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-1">
          {priority && (
            <span className="rounded-lg bg-red-500 px-2.5 py-1 text-sm font-medium uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-lg bg-green-500 px-2.5 py-1 text-sm font-medium uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 🤗`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs tracking-wide text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="m-2 divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="flex items-center justify-between font-medium text-stone-600">
          <span>Price pizza: </span> <span>{formatCurrency(orderPrice)}</span>
        </p>
        {priority && (
          <p className="flex items-center justify-between font-medium text-stone-600">
            <span>Price priority: </span>
            <span>{formatCurrency(priorityPrice)}</span>
          </p>
        )}
        <p className="flex items-center justify-between border-t border-stone-400 pt-2 font-bold text-stone-600">
          <span>To pay on delivery: </span>
          <span>{formatCurrency(orderPrice + priorityPrice)}</span>
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
