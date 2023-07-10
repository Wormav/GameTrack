import SectionMyGamesDesktop from '@src/components/SectionMyGames/SectionMyGamesDesktop/SectionMyGamesDesktop';
import SectionMyGamesMobile from '@src/components/SectionMyGames/SectionMyGamesMobile/SectionMyGamesMobile';
import useWindowWidth from '@src/hooks/useWindowWidth';

import React from 'react';

function Home() {
  const windowWidth = useWindowWidth();

  return (
    windowWidth > 560 ? <SectionMyGamesDesktop /> : <SectionMyGamesMobile />
  );
}

export default Home;
