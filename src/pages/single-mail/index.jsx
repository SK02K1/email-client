import './index.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { markAsFavorite, removeFromFavorites, markAsRead } from '@src/features';
import { useFetchSingleMail } from '@src/hooks';
import { Avatar } from '@src/components';

import {
  findMailById,
  getFormattedDate,
  isMailRead,
  isMarkedAsFavorite,
} from '@src/utils';

export const SingleMail = () => {
  const { mailId } = useParams();
  const dispatch = useDispatch();
  let { data, showLoader, error } = useFetchSingleMail(mailId);
  const mails = useSelector((store) => store.emails.list);
  const { favorites, readMails } = useSelector((store) => store.emails);

  data = { ...data, ...findMailById(mails, mailId) };

  const isFavorite = isMarkedAsFavorite(favorites, mailId);
  const isRead = isMailRead(readMails, mailId);

  const favoriteBtnHandler = () => {
    isFavorite
      ? dispatch(removeFromFavorites({ mailId }))
      : dispatch(markAsFavorite({ mailId }));
  };

  useEffect(() => {
    if (!isRead) {
      dispatch(markAsRead({ mailId }));
    }
  }, [mailId]);

  if (!mails) {
    return null;
  }

  return (
    <div className='mail-body-container'>
      <Avatar name={data?.from?.name} />
      <div className='mail-content-container'>
        <div className='mail-content-header'>
          <h2 className='mail-subject'>{data?.subject}</h2>
          <button onClick={favoriteBtnHandler} className='btn btn-favorite'>
            {isFavorite ? 'Remove from favorite' : 'Mark as favorite'}
          </button>
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
