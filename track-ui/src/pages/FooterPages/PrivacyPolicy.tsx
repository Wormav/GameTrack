import React from 'react';
import i18n from '@src/i18n';
import StyledContainer from './footerPages.styles';

export default function PrivacyPolicy() {
  return (
    <StyledContainer id="container">
      <h1>{i18n.t('mentions:privacyPolicy.privacyPolicy')}</h1>
      <span>{`${i18n.t('mentions:privacyPolicy.lastUpdate')}: 21 Septembre 2023`}</span>
      <p>
        {i18n.t('mentions:privacyPolicy.privacyPolicyText')}
      </p>
      <h2>{i18n.t('mentions:privacyPolicy.useData')}</h2>
      <p>
        {i18n.t('mentions:privacyPolicy.useDataText')}
      </p>
      <ul>
        <li>
          <span>
            {`${i18n.t('mentions:privacyPolicy.pseudo')}: `}
          </span>
          {i18n.t('mentions:privacyPolicy.pseudoText')}
        </li>
        <li>
          <span>
            {`${i18n.t('mentions:privacyPolicy.email')}: `}
          </span>
          {i18n.t('mentions:privacyPolicy.emailText')}
        </li>
      </ul>
      <h2>{i18n.t('mentions:privacyPolicy.cookies')}</h2>
      <p>
        {i18n.t('mentions:privacyPolicy.cookiesText')}
      </p>
      <h2>{i18n.t('mentions:privacyPolicy.storagePersonalData')}</h2>
      <p>
        {i18n.t('mentions:privacyPolicy.storagePersonalDataText')}
      </p>
      <h2>{i18n.t('mentions:privacyPolicy.dataSecurity')}</h2>
      <p>
        {i18n.t('mentions:privacyPolicy.dataSecurityText')}
      </p>
      <h2>{i18n.t('mentions:privacyPolicy.shareData')}</h2>
      <p>
        {i18n.t('mentions:privacyPolicy.shareDataText')}
      </p>
      <ul>
        <li>
          {' '}
          {i18n.t('mentions:privacyPolicy.shareReason')}
        </li>
        <li>
          {i18n.t('mentions:privacyPolicy.shareReason2')}
        </li>
      </ul>
      <h2>
        {i18n.t('mentions:privacyPolicy.yourRights')}
      </h2>
      <p>
        {i18n.t('mentions:privacyPolicy.yourRightsText')}
      </p>
      <h2>{i18n.t('mentions:privacyPolicy.modificationPolicy')}</h2>
      <p>
        {i18n.t('mentions:privacyPolicy.modificationPolicyText')}
      </p>
    </StyledContainer>
  );
}
