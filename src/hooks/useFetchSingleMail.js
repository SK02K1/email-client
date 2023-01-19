import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchSingleMail = (mailId) => {
  const [data, setData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);
        setError(null);
        const { data, status } = await axios.get(
          `https://flipkart-email-mock.now.sh/?id=${mailId}`
        );
        if (status === 200) {
          setData(data);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setShowLoader(false);
      }
    })();
  }, [mailId]);

  return { data, showLoader, error };
};
