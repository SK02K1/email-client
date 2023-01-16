import { Avatar } from '@src/components';
import './index.css';

export const MailInfoCard = ({ data }) => {
  const { date, from, subject, short_description } = data;
  const { name, email } = from;

  const formattedDate = new Date(date).toLocaleString('en-IN');

  return (
    <div className='mail-info-card'>
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
