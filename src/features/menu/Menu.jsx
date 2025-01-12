import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant.js';
import MenuItem from './MenuItem.jsx';

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="m-2 divide-y divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
