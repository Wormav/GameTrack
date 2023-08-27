import React from 'react';
import { useTranslation } from 'react-i18next';

function Error404() {
  const { t } = useTranslation(['common']);
  return (<div>{t('error')}</div>);
}

export default Error404;
