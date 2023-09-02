import React from 'react';
import SectionMyGamesDesktop from '@src/components/SectionMyGames/SectionMyGamesDesktop/SectionMyGamesDesktop';
import SectionMyGamesMobile from '@src/components/SectionMyGames/SectionMyGamesMobile/SectionMyGamesMobile';
import SectionMyListDesktop from '@src/components/SectionMyList/SectionMyListDesktop/SectionMyListDesktop';
import useWindowWidth from '@src/hooks/useWindowWidth';
import SectionMyListMobile from '@src/components/SectionMyList/SectionMyListMobile/SectionMyListMobile';

function Home() {
  const windowWidth = useWindowWidth();

  return (
    <div>
      {windowWidth > 560 ? (
        <>
          <SectionMyGamesDesktop />
          <SectionMyListDesktop />
        </>
      ) : (
        <>
          <SectionMyGamesMobile />
          <SectionMyListMobile />
        </>
      )}
    </div>
  );
}

export default Home;
