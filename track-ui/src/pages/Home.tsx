import React from 'react';
import SectionMyGamesDesktop from '@src/components/SectionMyGames/SectionMyGamesDesktop/SectionMyGamesDesktop';
import SectionMyGamesMobile from '@src/components/SectionMyGames/SectionMyGamesMobile/SectionMyGamesMobile';
import useWindowWidth from '@src/hooks/useWindowWidth';
import SectionMyList from '@src/components/SectionMyList/SectionMyList';

function Home() {
  const windowWidth = useWindowWidth();

  return (
    <>
      {windowWidth > 560 ? <SectionMyGamesDesktop /> : <SectionMyGamesMobile />}
      {windowWidth > 560 ? <SectionMyList /> : <SectionMyList />}
    </>
  );
}

export default Home;
