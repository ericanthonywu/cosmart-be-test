import openLibraryAxios from "../config/http/openLibrary/instance"

export default class OpenLibraryServices {
    public getOpenLibrary = async (genre: string, limit: number, page: number): Promise<any> => {
        const response = await openLibraryAxios.get(`/subjects/${genre}.json`, {
            params: { limit, offset: page },
        });

        return response.data.works.map((book: any) => ({
            key: book.key,
            title: book.title,
            authors: book.authors.map((author: any) => author.name).join(", "),
            editionCount: book.edition_count,
        }));
    }
}