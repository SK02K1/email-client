import './index.css';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmails } from '@src/features';
import { MailInfoCard } from '@src/components';
import { getFilteredMails } from '@src/utils';

export const Mails = () => {
  const { mailId } = useParams();
  const dispatch = useDispatch();
  const emailsState = useSelector((store) => store.emails);
  const filteredEmails = getFilteredMails(emailsState);
  const emails = emailsState.list;

  const emailsListing = filteredEmails?.map((emailInfo) => {
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
      <div className='mails-container'>
        {emails && (
          <div>
            {filteredEmails.length > 0 ? (
              emailsListing
            ) : (
              <p className='message mail-info-card'>no emails :)</p>
            )}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};
