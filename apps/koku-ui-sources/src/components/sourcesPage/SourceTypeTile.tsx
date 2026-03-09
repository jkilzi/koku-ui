import { Card, CardBody, Title } from '@patternfly/react-core';
import { sourceTypeIconMap } from 'components/sourcesPage/sourceTypeIcons';
import React from 'react';
import type { SourceType } from 'typings/source';

interface SourceTypeTileProps {
  sourceType: SourceType;
  onClick: (sourceType: SourceType) => void;
}

const SourceTypeTile: React.FC<SourceTypeTileProps> = ({ sourceType, onClick }) => {
  const Icon = sourceTypeIconMap[sourceType.id];

  return (
    <Card isSelectable isClickable onClick={() => onClick(sourceType)}>
      <CardBody>
        {Icon && <Icon size={48} style={{ marginBottom: '16px' }} />}
        <Title headingLevel="h3" size="lg">
          {sourceType.product_name}
        </Title>
      </CardBody>
    </Card>
  );
};

export { SourceTypeTile };
