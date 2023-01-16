import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmails } from '@src/features';
import { MailInfoCard } from '@src/components';

export const Mails = () => {
  const dispatch = useDispatch();
  const emails = useSelector((store) => store.emails.list);

  useEffect(() => {
    dispatch(getAllEmails());
  }, []);

  return (
    <div className='mails-container'>
      {emails &&
        emails.map((emailInfo) => (
          <MailInfoCard key={emailInfo.id} data={emailInfo} />
        ))}
    </div>
  );
};
