import UiVersion from '@koku-ui/ui-lib/components/page/uiVersion';
import { getLocale } from 'components/i18n';
import { ignoreDefaultMessageError } from 'components/i18n';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { sourcesStore } from 'redux/store';

// eslint-disable-next-line no-restricted-imports
import messages from '../../locales/data.json';

export interface SourcesPageWrapperOwnProps {
  children?: React.ReactNode;
}

type SourcesPageWrapperProps = SourcesPageWrapperOwnProps;

const SourcesPageWrapper: React.FC<SourcesPageWrapperProps> = ({ children }: SourcesPageWrapperOwnProps) => {
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
        <div className="sources">{children}</div>
        <UiVersion />
      </Provider>
    </IntlProvider>
  );
};

export { SourcesPageWrapper };
export default SourcesPageWrapper;
