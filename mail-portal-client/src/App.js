import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Emails from './components/tabs/Emails';
import Sent from './components/tabs/Sent';
import Main from './pages/Main';
import Auth from './pages/Auth';
import Signin from './components/Signin';
import CreateAccount from './components/CreateAccount';
import PrivateOutlet from './components/privateOutlet/PrivateOutlet';
import EmailView from './components/emailView/EmailView';
import SentEmailView from './components/emailView/SentEmailView';
import Bin from './components/tabs/Bin';
import MyProfile from './components/tabs/MyProfile';
import Profile from './components/tabs/Profile';
import Starred from './components/tabs/Starred';
import Toaster from 'react-hot-toast'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<PrivateOutlet />}>
              <Route path='/' element={<Main />}>
                    <Route path='' element={<Emails />} />
                    <Route path='inbox' element={<Emails />} />
                    <Route path='sent' element={<Sent />} />
                    <Route path='bin' element={<Bin />} />
                    <Route path='starred' element={<Starred />} />
                    <Route path='mail/:emailId' element={<EmailView />} />
                    <Route path='sent-mail/:emailId' element={<SentEmailView />} />
                    <Route path='my-profile' element={<MyProfile />} />
                    <Route path='profile/:userId' element={<Profile />} />

              </Route>
          </Route>
          <Route path='/auth' element={<Auth />} >
                <Route path='' element={<Signin />} />
                <Route path='signin' element={<Signin />} />
                <Route path='createAccount' element={<CreateAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
