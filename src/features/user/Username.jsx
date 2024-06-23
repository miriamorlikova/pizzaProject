import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden py-0.5 text-xs font-semibold tracking-wider md:block">
      {username}
    </div>
  );
}

export default Username;
