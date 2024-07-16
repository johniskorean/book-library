import apiClient from "./apiClient";

export const searchBooks = async (query: string) => {
    try {
        const response = await apiClient.get(`/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching books:", error);
        throw error;
    }
};

export const getBooksDetails = async (bookId: string) => {
    try {
        const response = await apiClient.get(`/book/${bookId}/`);
        return response.data;
    } catch (error) {
        console.error("Error getting book details:", error);
        throw error;
    }
};

export const saveBook = async (bookId: string) => {
    try {
        const response = await apiClient.post(`/save-book/${bookId}/`);
        return response.data;
    } catch (error) {
        console.error("Error saving book:", error);
        throw error;
    }
};

export const getSavedBooks = async () => {
    try {
        const response = await apiClient.get("/saved-books/");
        return response.data.books;
    } catch (error) {
        console.error("Error getting saved books:", error);
        throw error;
    }
};

export const deleteBook = async (bookId: string) => {
    try {
        const response = await apiClient.delete(`/delete-book/${bookId}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};
