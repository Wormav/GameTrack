import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledFooter from './footerDesktop.styles';

export default function FooterDesktop() {
  const { t } = useTranslation(['app']);

  return (
    <StyledFooter>
      <ul>
        <li>{t('cgu')}</li>
        <li>{t('policy')}</li>
        <li>© 2023 Gametrack</li>
      </ul>
    </StyledFooter>
  );
}
