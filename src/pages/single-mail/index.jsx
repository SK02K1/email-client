import './index.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findMailById, getFormattedDate } from '@src/utils';
import { useFetchSingleMail } from '@src/hooks';
import { Avatar } from '@src/components';

export const SingleMail = () => {
  const { mailId } = useParams();
  let { data, showLoader, error } = useFetchSingleMail(mailId);
  const mails = useSelector((store) => store.emails.list);
  data = { ...data, ...findMailById(mails, mailId) };

  if (!mails) {
    return null;
  }

  return (
    <div className='mail-body-container'>
      <Avatar name={data?.from?.name} />
      <div className='mail-content-container'>
        <div className='mail-content-header'>
          <h2 className='mail-subject'>{data?.subject}</h2>
          <button className='btn btn-favorite'>Mark as favorite</button>
        </div>
        <small className='mail-date'>{getFormattedDate(data?.date)}</small>
        <div
          className='mail-text'
          dangerouslySetInnerHTML={{ __html: data?.body }}
        />
      </div>
    </div>
  );
};
