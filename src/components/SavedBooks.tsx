import { useEffect, useState } from "react";
import { Book } from "../type";
import { deleteBook, getSavedBooks } from "../api/books";
import BookCard from "./BookCard";
import { PaginationItem, PaginationLink } from "./ui/pagination";
import usePagination from "../hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import Pagination from "./WrapPagination";

const booksPerPage = 6;

const SavedBooks: React.FC = () => {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, _setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("query") || "";

    const { currentPage, totalPages, handlePageChange, paginatedItems, ref } =
        usePagination<Book>(savedBooks.length, booksPerPage, queryParam);

    useEffect(() => {
        fetchSavedBooks();
    }, []);

    const fetchSavedBooks = async () => {
        setIsLoading(true);
        try {
            const books = await getSavedBooks();
            setSavedBooks(books);
        } catch (error) {
            setError("Failed to fetch saved books");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (bookId: string) => {
        try {
            await deleteBook(bookId);
            setSavedBooks(savedBooks.filter((book) => book.id !== bookId));
            fetchSavedBooks();
        } catch (error) {
            setError("Failed to delete book");
        }
    };

    return (
        <div ref={ref} className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold p-4">Saved Books</h1>
            {error && <p className="text-red-600">{error}</p>}
            {isLoading ? (
                <p className="font-bold">Loading saved books...</p>
            ) : savedBooks.length === 0 ? (
                <p className="font-bold px-3">
                    You haven't saved any books yet.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {paginatedItems(savedBooks).map((book) => (
                            <div key={book.id} className="relative">
                                <BookCard
                                    book={book}
                                    key={book.id}
                                    onAction={handleDelete}
                                    isSaved={true}
                                />
                            </div>
                        ))}
                    </div>

                    {savedBooks.length > booksPerPage && (
                        <div className="flex justify-center mt-6">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handlePageChange={handlePageChange}
                                renderItem={(i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            isActive={currentPage === i}
                                            onClick={() => handlePageChange(i)}
                                        >
                                            {i}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SavedBooks;
