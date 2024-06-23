import LinkButton from '../../ui/LinkButton.jsx';
import Button from '../../ui/Button.jsx';
import CartItem from './CartItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice.js';
import { getName } from '../user/userSlice.js';
import EmptyCart from './EmptyCart.jsx';

function Cart() {
  const cart = useSelector(getCart);

  const username = useSelector(getName);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart{username && `, ${username}`}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div>
        <Button to="/order/new" type="cartButton">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
