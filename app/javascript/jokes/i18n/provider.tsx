import React from 'react';
import { IntlProvider } from 'react-intl';

import messages from './messages';

interface Props {
  children: JSX.Element[];
  locale: string;
}

const I18nProvider = ({children, locale}: Props): JSX.Element => {
  return (
    <IntlProvider
      locale={locale}
      defaultLocale='en'
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>

  );
}

export default I18nProvider;
