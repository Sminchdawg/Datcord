import React, { useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from '../features/userSlice';
import ChannelBar from './ChannelBar';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { auth } from '../firebase';
import { login, logout } from '../features/userSlice';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        pallette: {
          type: 'dark',
        }
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
    <div className="app">
      {user ? (
        <React.Fragment>
          <Sidebar />
          <ChannelBar />
          <Chat />
        </React.Fragment>
      ): (
        <Login />
      )}
    </div>
    </ThemeProvider>
  );
}

export default App;
