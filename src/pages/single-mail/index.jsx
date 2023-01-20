import './index.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findMailById, getFormattedDate, isMarkedAsFavorite } from '@src/utils';
import { markAsFavorite, removeFromFavorites } from '@src/features';
import { useFetchSingleMail } from '@src/hooks';
import { Avatar } from '@src/components';

export const SingleMail = () => {
  const { mailId } = useParams();
  const dispatch = useDispatch();
  let { data, showLoader, error } = useFetchSingleMail(mailId);
  const mails = useSelector((store) => store.emails.list);
  const { favorites } = useSelector((store) => store.emails);

  data = { ...data, ...findMailById(mails, mailId) };

  const isFavorite = isMarkedAsFavorite(favorites, mailId);

  const favoriteBtnHandler = () => {
    isFavorite
      ? dispatch(removeFromFavorites({ mailId }))
      : dispatch(markAsFavorite({ mailId }));
  };

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
