import LinkButton from '../../ui/LinkButton.jsx';

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="wrap mt-2 bg-stone-200 px-6 py-5 text-base font-medium sm:text-lg">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
