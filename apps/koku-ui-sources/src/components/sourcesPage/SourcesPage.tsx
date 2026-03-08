import { Bullseye, PageSection, Spinner } from '@patternfly/react-core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from 'redux/store';
import { loadEntities, setFilter, setPage } from 'redux/sources/sourcesSlice';
import type { Source, SourceType } from 'typings/source';

import { sourcesRoutes } from '../../routes';
import { AddSourceWizard } from '../add-source-wizard/AddSourceWizard';
import { SourceDetail } from '../sourceDetail/SourceDetail';
import { SourceRemoveModal } from '../modals/SourceRemoveModal';
import { SourceRenameModal } from '../modals/SourceRenameModal';
import { SourcesTable } from '../sourcesTable/SourcesTable';
import { SourcesToolbar } from '../sourcesTable/SourcesToolbar';
import { SourcesEmptyState } from './SourcesEmptyState';

const SourcesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { entities, count, loading, filterValue, page, perPage } = useSelector(
    (state: RootState) => state.sources
  );
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState<string | undefined>();
  const [renameSource, setRenameSource] = useState<Source | null>(null);
  const [removeSource, setRemoveSource] = useState<Source | null>(null);

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

  const handleSelectSource = useCallback(
    (source: Source) => {
      navigate(`${sourcesRoutes.detail.replace(':uuid', source.uuid)}`);
    },
    [navigate]
  );

  const handleRename = useCallback((source: Source) => {
    setRenameSource(source);
  }, []);

  const handleRemove = useCallback((source: Source) => {
    setRemoveSource(source);
  }, []);

  const handleRenameSuccess = useCallback(() => {
    dispatch(loadEntities());
    setRenameSource(null);
  }, [dispatch]);

  const handleRemoveSuccess = useCallback(() => {
    dispatch(loadEntities());
    setRemoveSource(null);
    navigate('/');
  }, [dispatch, navigate]);

  const renderListContent = () => {
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
        <SourcesTable
          sources={entities}
          onSelectSource={handleSelectSource}
          onRename={handleRename}
          onRemove={handleRemove}
        />
      </PageSection>
    );
  };

  return (
    <>
      <Routes>
        <Route path={sourcesRoutes.detail} element={<SourceDetail />} />
        <Route path={sourcesRoutes.list} element={renderListContent()} />
      </Routes>
      <AddSourceWizard
        isOpen={isWizardOpen}
        onClose={handleWizardClose}
        onSubmitSuccess={handleWizardSuccess}
        preselectedType={preselectedType}
      />
      {renameSource && (
        <SourceRenameModal
          isOpen
          source={renameSource}
          onClose={() => setRenameSource(null)}
          onSuccess={handleRenameSuccess}
        />
      )}
      {removeSource && (
        <SourceRemoveModal
          isOpen
          source={removeSource}
          onClose={() => setRemoveSource(null)}
          onSuccess={handleRemoveSuccess}
        />
      )}
    </>
  );
};

export { SourcesPage };
