import { Label } from '@patternfly/react-core';
import { ActionsColumn, Table, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { getSourceTypeById } from 'api/sourceTypes';
import messages from 'locales/messages';
import React from 'react';
import { useIntl } from 'react-intl';
import type { Source } from 'typings/source';
import { formatRelativeDate } from 'utilities/relativeDate';

interface SourcesTableProps {
  sources: Source[];
  onSelectSource: (source: Source) => void;
  onRename: (source: Source) => void;
  onRemove: (source: Source) => void;
}

const getStatusColor = (source: Source): 'green' | 'orange' | 'red' => {
  if (source.paused) return 'orange';
  return source.active ? 'green' : 'red';
};

const formatStatus = (source: Source): string => {
  if (source.paused) {
    return 'Paused';
  }
  return source.active ? 'Available' : 'Unavailable';
};

const SourcesTable: React.FC<SourcesTableProps> = ({ sources, onSelectSource, onRename, onRemove }) => {
  const intl = useIntl();

  return (
    <Table aria-label="Sources table" variant={TableVariant.compact}>
      <Thead>
        <Tr>
          <Th>{intl.formatMessage(messages.name)}</Th>
          <Th>{intl.formatMessage(messages.sourceType)}</Th>
          <Th>{intl.formatMessage(messages.dateAdded)}</Th>
          <Th>{intl.formatMessage(messages.status)}</Th>
          <Th screenReaderText="Actions" />
        </Tr>
      </Thead>
      <Tbody>
        {sources.map(source => {
          const sourceType = getSourceTypeById(source.source_type);
          return (
            <Tr key={source.uuid} isClickable onRowClick={() => onSelectSource(source)}>
              <Td dataLabel={intl.formatMessage(messages.name)}>{source.name}</Td>
              <Td dataLabel={intl.formatMessage(messages.sourceType)}>
                {sourceType?.product_name ?? source.source_type}
              </Td>
              <Td dataLabel={intl.formatMessage(messages.dateAdded)}>{formatRelativeDate(source.created_timestamp)}</Td>
              <Td dataLabel={intl.formatMessage(messages.status)}>
                <Label color={getStatusColor(source)}>{formatStatus(source)}</Label>
              </Td>
              <Td isActionCell onClick={e => e.stopPropagation()}>
                <ActionsColumn
                  items={[
                    {
                      title: intl.formatMessage(messages.viewDetails),
                      onClick: () => onSelectSource(source),
                    },
                    {
                      title: intl.formatMessage(messages.rename),
                      onClick: () => onRename(source),
                    },
                    {
                      title: intl.formatMessage(messages.remove),
                      onClick: () => onRemove(source),
                      isDanger: true,
                    },
                  ]}
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export { SourcesTable };
