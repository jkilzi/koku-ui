import { act, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import sourcesReducer from 'redux/sources/sourcesSlice';
import { SourcesPage } from './SourcesPage';
import type { Source } from 'typings/source';

jest.mock('api/entities', () => ({
  listSources: jest.fn(),
  getSource: jest.fn(),
  createSource: jest.fn(),
  updateSource: jest.fn(),
  deleteSource: jest.fn(),
  createApplication: jest.fn(),
  deleteApplication: jest.fn(),
}));

const defaultState = {
  entities: [] as Source[],
  count: 0,
  loading: false,
  error: null,
  filterColumn: 'name' as const,
  filterValue: '',
  sortBy: 'name',
  sortDirection: 'asc' as const,
  page: 1,
  perPage: 10,
};

const renderWithProviders = (preloadedState = {}) => {
  const store = configureStore({
    reducer: { sources: sourcesReducer },
    preloadedState: { sources: { ...defaultState, ...preloadedState } },
  });
  return render(
    <IntlProvider locale="en" defaultLocale="en">
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <SourcesPage />
        </MemoryRouter>
      </Provider>
    </IntlProvider>
  );
};

describe('SourcesPage', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  it('shows spinner when loading with no entities', async () => {
    const { listSources } = require('api/entities');
    listSources.mockReturnValue(new Promise(() => {}));

    await act(async () => {
      renderWithProviders();
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows empty state when count is 0 and no filter', async () => {
    const { listSources } = require('api/entities');
    listSources.mockResolvedValue({
      data: [],
      meta: { count: 0 },
      links: { first: '', next: null, previous: null, last: '' },
    });

    await act(async () => {
      renderWithProviders();
    });

    expect(screen.getByText('No sources')).toBeInTheDocument();
    expect(
      screen.getByText('Add a source to get started with cost management.')
    ).toBeInTheDocument();
  });

  it('shows table when entities exist', () => {
    const { listSources } = require('api/entities');
    listSources.mockReturnValue(new Promise(() => {}));

    const mockSources: Source[] = [
      {
        id: 1,
        uuid: 'uuid-1',
        name: 'My OCP Source',
        source_type: 'OCP',
        authentication: {},
        billing_source: null,
        provider_linked: false,
        active: true,
        paused: false,
        current_month_data: false,
        previous_month_data: false,
        has_data: false,
        created_timestamp: '2026-01-15T10:00:00Z',
      },
    ];

    renderWithProviders({ entities: mockSources, count: 1 });

    expect(screen.getByText('My OCP Source')).toBeInTheDocument();
  });
});
