import { UserContext } from '@src/contexts/UserContext';
import React, { useContext } from 'react';

function Home() {
  const test = useContext(UserContext);

  console.log(test);

  return (
    <div>Home</div>
  );
}
export default Home;
