import { useDispatch } from 'react-redux';
import Button from '../../ui/Button.jsx';
import { decreaseItemQuatity, increaseItemQuantity } from './cartSlice.js';

function UpdateItemQuantity({ pizzaId, currentItemQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="quantity"
        onClick={() => dispatch(decreaseItemQuatity(pizzaId))}
      >
        −
      </Button>
      <span className="text-xs font-semibold text-stone-700">
        {currentItemQuantity}
      </span>
      <Button
        type="quantity"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
