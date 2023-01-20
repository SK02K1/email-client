import './index.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFormattedDate, isMailRead, isMarkedAsFavorite } from '@src/utils';
import { Avatar } from '@src/components';

export const MailInfoCard = ({ data, selectedMailId }) => {
  const navigate = useNavigate();
  const { favorites, readMails } = useSelector((store) => store.emails);
  const { id, date, from, subject, short_description } = data;
  const { name, email } = from;

  const formattedDate = getFormattedDate(date);
  const isFavorite = isMarkedAsFavorite(favorites, id);
  const isRead = isMailRead(readMails, id);

  const cardClickHandler = () => {
    navigate(`single-mail/${id}`);
  };

  return (
    <div
      data-active-email={id === selectedMailId}
      data-read-email={isRead}
      onClick={cardClickHandler}
      className='mail-info-card'
    >
      <Avatar name={name} />
      <div className='info-content-container'>
        <p>
          From: <span className='text-bold'>{name}</span>
          <span className='text-bold'>{`<${email}>`}</span>
        </p>
        <p>
          Subject: <span className='text-bold'>{subject}</span>
        </p>
        <p>{short_description}</p>
        <small>{formattedDate}</small>
        {isFavorite && <small className='favorite-status'>Favorite</small>}
      </div>
    </div>
  );
};
