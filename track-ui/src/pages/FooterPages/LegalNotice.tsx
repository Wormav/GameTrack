import React from 'react';
import i18n from '@src/i18n';
import StyledContainer from './footerPages.styles';

export default function LegalNotice() {
  return (
    <StyledContainer id="container">
      <h1>{i18n.t('mentions:legalNotice.legalNotice')}</h1>
      <h2>{i18n.t('mentions:legalNotice.othersOfTheSite')}</h2>
      <p>{`${i18n.t('mentions:legalNotice.siteCreatedBy')} Ziakor et Wormav`}</p>
      <h2>{i18n.t('mentions:legalNotice.contact')}</h2>
      <a href="contact@playtracker.app">contact@playtracker.app</a>
      <a href="https://discord.gg/ggMcmnuVcz" target="_blank" rel="noreferrer">Discord</a>
      <h2>{i18n.t('mentions:legalNotice.hosting')}</h2>
      <ul>
        <li>{`${i18n.t('mentions:legalNotice.socialReason')}: OVH SAS`}</li>
        <li>{`${i18n.t('mentions:legalNotice.address')}: 2 rue Kellermann - 59100 R)oubaix - France`}</li>
        <li>{`${i18n.t('mentions:legalNotice.immatriculation')}: 42476141900045 au RCS de Lille Métropole`}</li>
        <li>N° TVA Intracommunautaire : FR22424761419</li>
        <li>{`${i18n.t('mentions:legalNotice.capital')}: 10069020 €`}</li>
      </ul>
      <p>
        {i18n.t('mentions:legalNotice.ovhSas')}
      </p>
    </StyledContainer>
  );
}
