import './index.css';

export const Avatar = ({ name }) => {
  const firstLetter = name[0];
  return (
    <div className='avatar'>
      <span>{firstLetter}</span>
    </div>
  );
};
