import '@src/App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Mails, SingleMail } from '@src/pages';
import { Filters } from '@src/components';

export const App = () => {
  return (
    <div className='App'>
      <Filters />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/mails' element={<Mails />}>
          <Route path='single-mail/:mailId' element={<SingleMail />} />
        </Route>
      </Routes>
    </div>
  );
};
