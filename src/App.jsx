import '@src/App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Mails } from '@src/pages';

export const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/mails' element={<Mails />} />
      </Routes>
    </div>
  );
};
