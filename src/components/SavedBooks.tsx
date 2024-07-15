import { useEffect, useState } from "react";
import { Book } from "../type";
import { deleteBook, getSavedBooks } from "../api/books";
import BookCard from "./BookCard";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
	PaginationLink,
} from "./ui/pagination";
import usePagination from "../hooks/usePagination";

const booksPerPage = 6;

const SavedBooks: React.FC = () => {
	const [savedBooks, setSavedBooks] = useState<Book[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { currentPage, totalPages, handlePageChange, paginatedItems, ref } =
		usePagination<Book>(savedBooks.length, booksPerPage);

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
	const renderPaginatedItems = () => {
		const items = [];
		const rangeStart = Math.max(1, currentPage - 2);
		const rangeEnd = Math.min(totalPages, currentPage + 2);

		for (let i = rangeStart; i <= rangeEnd; i++) {
			items.push(
				<PaginationItem key={i}>
					<PaginationLink
						isActive={currentPage === i}
						onClick={() => handlePageChange(i)}
					>
						{i}
					</PaginationLink>
				</PaginationItem>
			);
		}
		return items;
	};

	return (
		<div ref={ref} className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold p-4">Saved Books</h1>
			{error && <p className="text-red-600">{error}</p>}
			{isLoading ? (
				<p>Loading saved books...</p>
			) : savedBooks.length === 0 ? (
				<p>You haven't saved any books yet.</p>
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

							{/* TODO: Fix the pagination feature for Saved Books */}

					{savedBooks.length > booksPerPage && (
						<div className="flex justify-center mt-6">
							<Pagination>
								<PaginationContent>
									<PaginationPrevious
										onClick={() => handlePageChange(currentPage - 1)}
									/>
									{renderPaginatedItems()}
									<PaginationNext
										onClick={() => handlePageChange(currentPage + 1)}
									/>
								</PaginationContent>
							</Pagination>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default SavedBooks;
