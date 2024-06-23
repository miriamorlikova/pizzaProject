import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utilities/helpers.js';
import DeleteItem from './DeleteItem.jsx';
import UpdateItemQuantity from './UpdateItemQuantity.jsx';
import { getCurrentQuantity } from './cartSlice.js';
import { useState } from 'react';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentItemQuantity = useSelector(getCurrentQuantity(pizzaId));
  const [isWrapped, setIsWrapped] = useState(false);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleToggle() {
    if (!isSubmitted) setIsWrapped(!isWrapped);
  }

  function handleNoteChange(e) {
    setNote(e.target.value);
  }

  function handleNoteSubmit() {
    if (!note) return;

    setIsSubmitted(true);
  }

  function handleNoteDelete() {
    setIsSubmitted(false);
    setNote('');
    setIsWrapped(false);
  }

  return (
    <li>
      <div className="py-1.5 sm:flex sm:items-center sm:justify-between sm:py-3 lg:py-3.5">
        <p className="mb-1 sm:mb-0">
          {quantity}&times; {name}
        </p>
        <div className="flex items-center justify-between sm:gap-6">
          <p className="text-sm font-bold text-stone-500">
            {formatCurrency(totalPrice)}
          </p>
          <UpdateItemQuantity
            pizzaId={pizzaId}
            currentItemQuantity={currentItemQuantity}
          />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-wide text-stone-500">
          Add note
          <span
            onClick={handleToggle}
            className={`duration-400 rounded-sm bg-stone-200 p-[0.04rem] transition-all ${isSubmitted ? 'cursor-not-allowed' : 'hover:cursor-pointer hover:bg-yellow-100 hover:ring-1 hover:ring-yellow-400'}`}
          >
            <svg
              focusable="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              style={{
                transform: isWrapped ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
            >
              <path
                fill="rgb(120 113 108 / var(--tw-text-opacity))"
                d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
              />
            </svg>
          </span>
        </p>
        {(isWrapped || isSubmitted) && (
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={note}
              onChange={handleNoteChange}
              disabled={isSubmitted}
              className="rounded-md border px-1 py-0.5 text-xs focus:border-none focus:bg-yellow-50 focus:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-0 active:ring-2 active:ring-yellow-400 disabled:cursor-not-allowed disabled:ring-0"
            />

            {isSubmitted ? (
              <span
                onClick={handleNoteDelete}
                className="duration-400 self-center rounded-sm bg-stone-200 px-[0.31rem] pb-[0.05rem] text-[0.6rem] font-medium text-stone-500 transition-all hover:cursor-pointer hover:bg-yellow-100 hover:ring-1 hover:ring-yellow-400"
              >
                &times;
              </span>
            ) : (
              <span
                onClick={handleNoteSubmit}
                className={`duration-400 rounded-sm bg-stone-200 p-0.5 transition-all ${!note ? 'cursor-not-allowed' : 'hover:cursor-pointer hover:bg-yellow-100 hover:ring-1 hover:ring-yellow-400'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="rgb(120 113 108 / var(--tw-text-opacity))"
                >
                  <path d="M9 16.2l-3.5-3.5L4 14.3l5 5 11-11-1.5-1.4z" />
                </svg>
              </span>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default CartItem;
