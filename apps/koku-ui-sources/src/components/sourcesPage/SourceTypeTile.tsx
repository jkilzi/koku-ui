import { Card, CardBody, CardTitle } from '@patternfly/react-core';
import React from 'react';
import type { SourceType } from 'typings/source';

interface SourceTypeTileProps {
  sourceType: SourceType;
  onClick: (sourceType: SourceType) => void;
}

const SourceTypeTile: React.FC<SourceTypeTileProps> = ({ sourceType, onClick }) => {
  return (
    <Card isSelectable isClickable onClick={() => onClick(sourceType)}>
      <CardTitle>{sourceType.product_name}</CardTitle>
      <CardBody>{sourceType.category}</CardBody>
    </Card>
  );
};

export { SourceTypeTile };
