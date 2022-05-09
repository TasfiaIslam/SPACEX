import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getLaunches } from './launchSlice';

const Launches = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLaunches());
  }, [dispatch]);

  return <div>Launches</div>;
};

export default Launches;
