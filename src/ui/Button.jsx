import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    ' inline-block text-sm  bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' m-4 px-4 py-3 sm:px-5 sm:py-4 rounded-lg',
    secondary:
      'px-3.5 py-2.5 text-sm rounded-lg sm:px-4.5 sm:py-3.5 inline-block rounded-lg font-semibold uppercase tracking-wide text-stone-500 transition-colors duration-300 hover:text-yellow-400 hover:border-yellow-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-1 disabled:cursor-not-allowed border-2 border-yellow-400 ',
    small:
      base + ' px-3 rounded-lg py-2 md:px-4 md:py-3 text-xs lg:text-sm m-0',

    cartButton: base + ' my-4 mr-4 rounded-lg px-4 py-3 sm:px-5 sm:py-4',
    quantity:
      base + ' px-2 py-1 md:px-3 rounded-full md:py-2 text-xs lg:text-sm ',
    location:
      base + ' px-2.5 rounded-lg py-1.5 md:px-4.5 md:py-3.5 text-xs m-0 ',
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
