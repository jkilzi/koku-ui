import { EmptyState, EmptyStateBody, Gallery, GalleryItem } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { SOURCE_TYPES } from 'api/sourceTypes';
import React from 'react';
import { useIntl } from 'react-intl';
import type { SourceType } from 'typings/source';

import messages from '../../locales/messages';
import { SourceTypeTile } from './SourceTypeTile';

interface SourcesEmptyStateProps {
  onSelectType: (sourceType: SourceType) => void;
}

const SourcesEmptyState: React.FC<SourcesEmptyStateProps> = ({ onSelectType }) => {
  const intl = useIntl();

  return (
    <>
      <EmptyState icon={PlusCircleIcon} titleText={intl.formatMessage(messages.emptyStateTitle)}>
        <EmptyStateBody>{intl.formatMessage(messages.emptyStateBody)}</EmptyStateBody>
      </EmptyState>
      <Gallery hasGutter minWidths={{ default: '200px' }} style={{ padding: '24px' }}>
        {SOURCE_TYPES.map(sourceType => (
          <GalleryItem key={sourceType.id}>
            <SourceTypeTile sourceType={sourceType} onClick={onSelectType} />
          </GalleryItem>
        ))}
      </Gallery>
    </>
  );
};

export { SourcesEmptyState };
