import {
  ActionList,
  ActionListItem,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Bullseye,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Label,
  PageSection,
  Spinner,
  Title,
} from '@patternfly/react-core';
import { getSource } from 'api/entities';
import { getSourceTypeById } from 'api/sourceTypes';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import type { Source } from 'typings/source';

import messages from '../../locales/messages';
import { SourceRemoveModal } from '../modals/SourceRemoveModal';
import { SourceRenameModal } from '../modals/SourceRenameModal';

const SourceDetail: React.FC = () => {
  const intl = useIntl();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [source, setSource] = useState<Source | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  const fetchSource = useCallback(async () => {
    if (!uuid) return;
    setLoading(true);
    try {
      const data = await getSource(uuid);
      setSource(data);
    } catch {
      setSource(null);
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    fetchSource();
  }, [fetchSource]);

  const handleRemoveSuccess = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRenameSuccess = useCallback(() => {
    fetchSource();
    setIsRenameOpen(false);
  }, [fetchSource]);

  if (loading) {
    return (
      <PageSection isFilled>
        <Bullseye>
          <Spinner size="lg" />
        </Bullseye>
      </PageSection>
    );
  }

  if (!source) {
    return (
      <PageSection>
        <Title headingLevel="h2">{intl.formatMessage(messages.sourceNotFound)}</Title>
      </PageSection>
    );
  }

  const sourceType = getSourceTypeById(source.source_type);
  const statusLabel = source.paused ? 'Paused' : source.active ? 'Available' : 'Unavailable';
  const statusColor = source.active && !source.paused ? 'green' : source.paused ? 'orange' : 'red';

  return (
    <>
      <PageSection>
        <Breadcrumb>
          <BreadcrumbItem
            to="#"
            onClick={e => {
              e.preventDefault();
              navigate('/');
            }}
          >
            {intl.formatMessage(messages.sourcesTabTitle)}
          </BreadcrumbItem>
          <BreadcrumbItem isActive>{source.name}</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <Title headingLevel="h1" style={{ marginBottom: '16px' }}>
          {source.name}
        </Title>
        <ActionList style={{ marginBottom: '24px' }}>
          <ActionListItem>
            <Button variant="secondary" onClick={() => setIsRenameOpen(true)}>
              {intl.formatMessage(messages.rename)}
            </Button>
          </ActionListItem>
          <ActionListItem>
            <Button variant="danger" onClick={() => setIsRemoveOpen(true)}>
              {intl.formatMessage(messages.remove)}
            </Button>
          </ActionListItem>
        </ActionList>
        <DescriptionList isHorizontal>
          <DescriptionListGroup>
            <DescriptionListTerm>{intl.formatMessage(messages.sourceType)}</DescriptionListTerm>
            <DescriptionListDescription>{sourceType?.product_name ?? source.source_type}</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{intl.formatMessage(messages.status)}</DescriptionListTerm>
            <DescriptionListDescription>
              <Label color={statusColor}>{statusLabel}</Label>
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{intl.formatMessage(messages.dateAdded)}</DescriptionListTerm>
            <DescriptionListDescription>
              {source.created_timestamp ? new Date(source.created_timestamp).toLocaleDateString() : '—'}
            </DescriptionListDescription>
          </DescriptionListGroup>
          {source.authentication?.credentials?.cluster_id && (
            <DescriptionListGroup>
              <DescriptionListTerm>Cluster ID</DescriptionListTerm>
              <DescriptionListDescription>
                {source.authentication.credentials.cluster_id}
              </DescriptionListDescription>
            </DescriptionListGroup>
          )}
          {source.billing_source?.data_source?.bucket && (
            <DescriptionListGroup>
              <DescriptionListTerm>S3 bucket</DescriptionListTerm>
              <DescriptionListDescription>{source.billing_source.data_source.bucket}</DescriptionListDescription>
            </DescriptionListGroup>
          )}
        </DescriptionList>
      </PageSection>

      <SourceRemoveModal
        isOpen={isRemoveOpen}
        source={source}
        onClose={() => setIsRemoveOpen(false)}
        onSuccess={handleRemoveSuccess}
      />
      <SourceRenameModal
        isOpen={isRenameOpen}
        source={source}
        onClose={() => setIsRenameOpen(false)}
        onSuccess={handleRenameSuccess}
      />
    </>
  );
};

export { SourceDetail };
