import { useDispatch } from 'react-redux';
import Button from '../../ui/Button.jsx';
import { deleteItem } from './cartSlice.js';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete item
    </Button>
  );
}

export default DeleteItem;
