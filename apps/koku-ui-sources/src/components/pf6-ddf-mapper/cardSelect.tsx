import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { Card, CardBody, CardTitle, Gallery, GalleryItem } from '@patternfly/react-core';
import React from 'react';

const CardSelect: React.FC<any> = props => {
  const { input, options = [] } = useFieldApi(props);

  return (
    <Gallery hasGutter minWidths={{ default: '200px' }}>
      {options.map((opt: any) => (
        <GalleryItem key={opt.value}>
          <Card isSelectable isSelected={input.value === opt.value} onClick={() => input.onChange(opt.value)}>
            <CardTitle>{opt.label}</CardTitle>
            {opt.description && <CardBody>{opt.description}</CardBody>}
          </Card>
        </GalleryItem>
      ))}
    </Gallery>
  );
};

export default CardSelect;
