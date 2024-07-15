import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BookCard from "./BookCard";
import { saveBook, searchBooks } from "../api/books";
import usePagination from "../hooks/usePagination";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";
import { Book } from "../type";

const booksPerPage = 9;

const Home: React.FC = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [programBooks, setProgramBooks] = useState<Book[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [lastSearch, setLastSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const { currentPage, totalPages, handlePageChange, paginatedItems, ref } =
		usePagination<Book>(books.length, booksPerPage);

	useEffect(() => {
		fetchRandomLanguageBooks();
	}, []);

	const fetchBooks = async (query: string) => {
		try {
			const result = await searchBooks(query);
			return result.items || [];
		} catch (error) {
			setError("failed to fetch books");
			return [];
		}
	};

	const fetchRandomLanguageBooks = async () => {
		const languages = [
			"Python",
			"React",
			"TypeScript",
			"JavaScript",
			"Rust language",
			"Node",
		];
		const randomLanguage =
			languages[Math.floor(Math.random() * languages.length)];

		const result = await searchBooks(randomLanguage);
		setProgramBooks(result.items || []);
	};

	const handleSearch = async (query: string) => {
		setIsLoading(true);
		setIsSearching(true);
		const result = await fetchBooks(query);
		setBooks(result);
		handlePageChange(1);
		setLastSearch(query);
		setIsLoading(false);
	};

	const handleSave = async (bookId: string) => {
		try {
			await saveBook(bookId);
		} catch (error) {
			setError("Failed to save book");
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
			<h1 className="text-3xl font-bold p-4 flex justify-center items-center">
				Search Books
			</h1>
			<SearchBar onSearch={handleSearch} initialInput={lastSearch} />
			{error && <p className="text-red-600">{error}</p>}

			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					{isSearching && books.length > 0 ? (
						<>
							<h2 className="text-2xl font-bold p-2 mt-2">Search Results</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
								{paginatedItems(books).map((book) => (
									<BookCard key={book.id} book={book} onAction={handleSave} />
								))}
							</div>
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
						</>
					) : isSearching ? (
						<p>No books found.</p>
					) : (
						programBooks.length > 0 && (
							<div>
								<h2 className="text-2xl font-bold p-4">Program Languages</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
									{programBooks.map((book) => (
										<BookCard key={book.id} book={book} onAction={handleSave} />
									))}
								</div>
							</div>
						)
					)}
				</>
			)}
		</div>
	);
};

export default Home;
