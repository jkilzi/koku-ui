import UiVersion from '@koku-ui/ui-lib/components/page/uiVersion';
import { getLocale, ignoreDefaultMessageError } from 'components/i18n';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { sourcesStore } from 'redux/store';

import { SourcesPage } from '../components/sourcesPage/SourcesPage';

// eslint-disable-next-line no-restricted-imports
import messages from '../../locales/data.json';

const SourcesPageWrapper: React.FC = () => {
  const locale = getLocale();
  const messagesByLocale = messages as Record<string, Record<string, string>>;

  return (
    <IntlProvider
      defaultLocale="en"
      locale={locale}
      messages={messagesByLocale[locale] || messagesByLocale.en}
      onError={ignoreDefaultMessageError}
    >
      <Provider store={sourcesStore as any}>
        <SourcesPage />
        <UiVersion />
      </Provider>
    </IntlProvider>
  );
};

export default SourcesPageWrapper;
