import { Bullseye, PageSection, Spinner } from '@patternfly/react-core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'redux/store';
import { loadEntities, setFilter, setPage } from 'redux/sources/sourcesSlice';
import type { Source, SourceType } from 'typings/source';

import { AddSourceWizard } from '../add-source-wizard/AddSourceWizard';
import { SourcesTable } from '../sourcesTable/SourcesTable';
import { SourcesToolbar } from '../sourcesTable/SourcesToolbar';
import { SourcesEmptyState } from './SourcesEmptyState';

const SourcesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, count, loading, filterValue, page, perPage } = useSelector(
    (state: RootState) => state.sources
  );
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState<string | undefined>();

  useEffect(() => {
    dispatch(loadEntities());
  }, [dispatch, filterValue, page, perPage]);

  const handleFilterChange = useCallback(
    (value: string) => {
      dispatch(setFilter({ filterValue: value }));
      dispatch(loadEntities());
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (newPage: number, newPerPage: number) => {
      dispatch(setPage({ page: newPage, perPage: newPerPage }));
      dispatch(loadEntities());
    },
    [dispatch]
  );

  const handleSelectType = useCallback((sourceType: SourceType) => {
    setPreselectedType(sourceType.id);
    setIsWizardOpen(true);
  }, []);

  const handleAddSource = useCallback(() => {
    setPreselectedType(undefined);
    setIsWizardOpen(true);
  }, []);

  const handleWizardClose = useCallback(() => {
    setIsWizardOpen(false);
    setPreselectedType(undefined);
  }, []);

  const handleWizardSuccess = useCallback(() => {
    dispatch(loadEntities());
  }, [dispatch]);

  const handleSelectSource = useCallback((_source: Source) => {
    // TODO: Increment 3 — navigate to source detail
  }, []);

  if (loading && entities.length === 0) {
    return (
      <PageSection isFilled>
        <Bullseye>
          <Spinner size="lg" />
        </Bullseye>
      </PageSection>
    );
  }

  if (!loading && count === 0 && !filterValue) {
    return (
      <PageSection isFilled>
        <SourcesEmptyState onSelectType={handleSelectType} />
      </PageSection>
    );
  }

  return (
    <>
      <PageSection>
        <SourcesToolbar
          count={count}
          page={page}
          perPage={perPage}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
          onAddSource={handleAddSource}
        />
        <SourcesTable sources={entities} onSelectSource={handleSelectSource} />
      </PageSection>
      <AddSourceWizard
        isOpen={isWizardOpen}
        onClose={handleWizardClose}
        onSubmitSuccess={handleWizardSuccess}
        preselectedType={preselectedType}
      />
    </>
  );
};

export { SourcesPage };
