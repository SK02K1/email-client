import './index.css';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmails } from '@src/features';
import { MailInfoCard } from '@src/components';

export const Mails = () => {
  const dispatch = useDispatch();
  const emails = useSelector((store) => store.emails.list);
  const { mailId } = useParams();

  const emailsListing = emails?.map((emailInfo) => {
    return (
      <MailInfoCard
        key={emailInfo.id}
        data={emailInfo}
        selectedMailId={mailId}
      />
    );
  });

  useEffect(() => {
    if (!emails) {
      dispatch(getAllEmails());
    }
  }, []);

  return (
    <div className='layout'>
      <div className='mails-container'>{emails && emailsListing}</div>
      <Outlet />
    </div>
  );
};
