import axios from 'axios';
import {
  listSources,
  getSource,
  createSource,
  updateSource,
  deleteSource,
  createApplication,
} from './entities';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('entities API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('listSources', () => {
    it('calls axios.get with correct URL and empty params by default', async () => {
      const mockResponse = {
        data: [],
        meta: { count: 0 },
        links: { first: '', next: null, previous: null, last: '' },
      };
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      await listSources();

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/cost-management/v1/sources/', {
        params: {},
      });
    });

    it('includes params when provided', async () => {
      const mockResponse = {
        data: [],
        meta: { count: 0 },
        links: { first: '', next: null, previous: null, last: '' },
      };
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      await listSources({ name: 'test' });

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/cost-management/v1/sources/', {
        params: { name: 'test' },
      });
    });
  });

  describe('getSource', () => {
    it('calls axios.get with correct URL for uuid', async () => {
      const mockSource = { id: 1, uuid: 'uuid-1', name: 'Test' };
      mockedAxios.get.mockResolvedValue({ data: mockSource });

      const result = await getSource('uuid-1');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        '/api/cost-management/v1/sources/uuid-1/'
      );
      expect(result).toEqual(mockSource);
    });
  });

  describe('createSource', () => {
    it('calls axios.post with correct data', async () => {
      const createData = { name: 'x', source_type: 'OCP' };
      const mockSource = { id: 1, uuid: 'uuid-1', ...createData };
      mockedAxios.post.mockResolvedValue({ data: mockSource });

      const result = await createSource(createData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/cost-management/v1/sources/',
        createData
      );
      expect(result).toEqual(mockSource);
    });
  });

  describe('updateSource', () => {
    it('calls axios.patch with correct URL and data', async () => {
      const updateData = { name: 'new' };
      const mockSource = { id: 1, uuid: 'uuid-1', name: 'new' };
      mockedAxios.patch.mockResolvedValue({ data: mockSource });

      const result = await updateSource('uuid-1', updateData);

      expect(mockedAxios.patch).toHaveBeenCalledWith(
        '/api/cost-management/v1/sources/uuid-1/',
        updateData
      );
      expect(result).toEqual(mockSource);
    });
  });

  describe('deleteSource', () => {
    it('calls axios.delete with correct URL', async () => {
      mockedAxios.delete.mockResolvedValue({});

      await deleteSource('uuid-1');

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        '/api/cost-management/v1/sources/uuid-1/'
      );
    });
  });

  describe('createApplication', () => {
    it('calls axios.post to applications path with correct data', async () => {
      const createData = {
        source_id: 1,
        application_type_id: 2,
        extra: {},
      };
      const mockApplication = { id: 1, ...createData };
      mockedAxios.post.mockResolvedValue({ data: mockApplication });

      const result = await createApplication(createData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/cost-management/v1/applications/',
        createData
      );
      expect(result).toEqual(mockApplication);
    });
  });
});
