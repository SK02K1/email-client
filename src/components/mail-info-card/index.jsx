import './index.css';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@src/components';
import { getFormattedDate } from '@src/utils';

export const MailInfoCard = ({ data, selectedMailId }) => {
  const navigate = useNavigate();

  const { id, date, from, subject, short_description } = data;
  const { name, email } = from;

  const formattedDate = getFormattedDate(date);

  const cardClickHandler = () => {
    navigate(`single-mail/${id}`);
  };

  return (
    <div
      data-active-email={id === selectedMailId}
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
      </div>
    </div>
  );
};
