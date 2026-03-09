import { Card, CardBody, Title } from '@patternfly/react-core';
import React from 'react';
import type { SourceType } from 'typings/source';

import { sourceTypeIconMap } from 'components/sourcesPage/sourceTypeIcons';

interface SourceTypeTileProps {
  sourceType: SourceType;
  onClick: (sourceType: SourceType) => void;
}

const SourceTypeTile: React.FC<SourceTypeTileProps> = ({ sourceType, onClick }) => {
  const Icon = sourceTypeIconMap[sourceType.id];

  return (
    <Card isSelectable isClickable onClick={() => onClick(sourceType)}>
      <CardBody>
        {Icon && <Icon style={{ width: 48, height: 48, marginBottom: '16px' }} />}
        <Title headingLevel="h3" size="lg">
          {sourceType.product_name}
        </Title>
      </CardBody>
    </Card>
  );
};

export { SourceTypeTile };
