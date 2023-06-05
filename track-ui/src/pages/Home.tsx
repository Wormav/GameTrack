import React from 'react';
import Layout from '@components/Layout/Layout';
import GameCard from '@components/GameCard/GameCard';

const handleClickGameCard = () => {

};

function Home() {
  return (
    <Layout>
      <GameCard size="xl" onClick={handleClickGameCard} isCompleted id={1} />
    </Layout>
  );
}

export default Home;
