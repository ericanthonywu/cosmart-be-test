import OpenLibraryServices from '../services/openLibraryServices';
import openLibraryAxios from '../config/http/openLibrary/instance';

jest.mock('../config/http/openLibrary/instance');

describe('OpenLibraryServices', () => {
    let openLibraryServices: OpenLibraryServices;

    beforeEach(() => {
        openLibraryServices = new OpenLibraryServices();
    });

    describe('getOpenLibrary', () => {
        it('should fetch books and return formatted data', async () => {
            const mockResponse = {
                data: {
                    works: [
                        {
                            key: '/works/OL1234567W',
                            title: 'Book Title 1',
                            authors: [{ name: 'Author 1' }],
                            edition_count: 2,
                        },
                        {
                            key: '/works/OL7654321W',
                            title: 'Book Title 2',
                            authors: [{ name: 'Author 2' }, { name: 'Author 3' }],
                            edition_count: 1,
                        },
                    ],
                },
            };

            (openLibraryAxios.get as jest.Mock).mockResolvedValue(mockResponse);

            const genre = 'fiction';
            const limit = 10;
            const page = 0;

            const result = await openLibraryServices.getOpenLibrary(genre, limit, page);

            expect(openLibraryAxios.get).toHaveBeenCalledTimes(1);
            expect(openLibraryAxios.get).toHaveBeenCalledWith(`/subjects/${genre}.json`, {
                params: { limit, offset: page },
            });
            expect(result).toEqual([
                {
                    key: '/works/OL1234567W',
                    title: 'Book Title 1',
                    authors: 'Author 1',
                    editionCount: 2,
                },
                {
                    key: '/works/OL7654321W',
                    title: 'Book Title 2',
                    authors: 'Author 2, Author 3',
                    editionCount: 1,
                },
            ]);
        });

        it('should handle empty works array', async () => {
            const mockResponse = { data: { works: [] } };
            (openLibraryAxios.get as jest.Mock).mockResolvedValue(mockResponse);

            const genre = 'non-fiction';
            const limit = 5;
            const page = 1;

            const result = await openLibraryServices.getOpenLibrary(genre, limit, page);

            expect(openLibraryAxios.get).toHaveBeenCalledTimes(2);
            expect(result).toEqual([]);
        });
    });
});
