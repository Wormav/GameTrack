import React from 'react';
import i18n from '@src/i18n';
import StyledContainer from './footerPages.styles';

export default function About() {
  return (
    <StyledContainer id="container">
      <h1>{i18n.t('mentions:about.welcome')}</h1>
      <h2>{i18n.t('mentions:about.presentation')}</h2>
      <p>{i18n.t('mentions:about.presentationText')}</p>
      <h2>{i18n.t('mentions:about.mainFunction')}</h2>
      <ul>
        <li>
          <span>{`${i18n.t('mentions:about.addGame')}: `}</span>
          {i18n.t('mentions:about.addGameText')}
        </li>
        <li>
          <span>{`${i18n.t('mentions:about.followProgress')}: `}</span>
          {i18n.t('mentions:about.followProgressText')}
        </li>
        <li>
          <span>{`${i18n.t('mentions:about.personalStats')}: `}</span>
          {i18n.t('mentions:about.personalStatsText')}
        </li>
        <li>
          <span>{`${i18n.t('mentions:about.customLists')}: `}</span>
          {i18n.t('mentions:about.customListsText')}
        </li>
      </ul>
      <h2>{i18n.t('mentions:about.betaVersion')}</h2>
      <p>{i18n.t('mentions:about.betaVersionText')}</p>
      <h2>{i18n.t('mentions:about.joinTheCommunity')}</h2>
      <p>{i18n.t('mentions:about.joinTheCommunityText')}</p>
      <h2>{i18n.t('mentions:about.readyDiscover')}</h2>
      <p>{i18n.t('mentions:about.readyDiscoverText')}</p>
      <h2>{i18n.t('mentions:about.contact')}</h2>
      <a href="contact@playtracker.app">contact@playtracker.app</a>
      <a href="https://discord.gg/ggMcmnuVcz" target="_blank" rel="noreferrer">
        Discord
      </a>
    </StyledContainer>
  );
}
