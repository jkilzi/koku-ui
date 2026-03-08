import {
  Button,
  Pagination,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';

import messages from '../../locales/messages';

interface SourcesToolbarProps {
  count: number;
  page: number;
  perPage: number;
  filterValue: string;
  onFilterChange: (value: string) => void;
  onPageChange: (page: number, perPage: number) => void;
  onAddSource: () => void;
}

const SourcesToolbar: React.FC<SourcesToolbarProps> = ({
  count,
  page,
  perPage,
  filterValue,
  onFilterChange,
  onPageChange,
  onAddSource,
}) => {
  const intl = useIntl();
  const [localFilter, setLocalFilter] = useState(filterValue);

  const handleFilterSubmit = useCallback(() => {
    onFilterChange(localFilter);
  }, [localFilter, onFilterChange]);

  const handleFilterClear = useCallback(() => {
    setLocalFilter('');
    onFilterChange('');
  }, [onFilterChange]);

  return (
    <Toolbar>
      <ToolbarContent>
        <ToolbarItem>
          <SearchInput
            placeholder={intl.formatMessage(messages.filterByName)}
            value={localFilter}
            onChange={(_event, value) => setLocalFilter(value)}
            onSearch={handleFilterSubmit}
            onClear={handleFilterClear}
          />
        </ToolbarItem>
        <ToolbarGroup align={{ default: 'alignEnd' }}>
          <ToolbarItem>
            <Button variant="primary" onClick={onAddSource}>
              {intl.formatMessage(messages.addSource)}
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem variant="pagination">
          <Pagination
            itemCount={count}
            page={page}
            perPage={perPage}
            onSetPage={(_event, p) => onPageChange(p, perPage)}
            onPerPageSelect={(_event, pp) => onPageChange(1, pp)}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

export { SourcesToolbar };
