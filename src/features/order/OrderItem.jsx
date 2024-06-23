import { formatCurrency } from '../../utilities/helpers.js';

function OrderItem({ item, isLoadingIngredients, ingredients, note }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex items-center justify-between pt-3 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="pb-3 text-[0.6rem] capitalize text-stone-500">
        {isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
      </p>
      {note !== undefined && (
        <p className="pb-3 text-[0.6rem] capitalize text-stone-500">
          Note: {note}
        </p>
      )}
    </li>
  );
}

export default OrderItem;
