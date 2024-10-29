import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser  , setAuthToken} from './actions/authActions';
import Paths from './Paths';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return <Paths />;
}

export default App;