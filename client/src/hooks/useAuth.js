import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../redux/slices/authSlice';
import { getMe } from '../api/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token && !user) {
      const fetchUser = async () => {
        try {
          const userData = await getMe();
          dispatch(loadUser(userData.data));
        } catch (err) {
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [token, user, dispatch]);

  return { user, token, isAuthenticated, loading, error };
};