import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Book } from "../type";
import { useToast } from "../hooks/useToast";
import DOMPurify from "dompurify";

interface BookCardProps {
	book: Book;
	onAction: (bookId: string) => void;
	isSaved?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
	book,
	onAction,
	isSaved = false,
}) => {
	const { toast } = useToast();

	const title = book.volumeInfo?.title || book.title || "Untitled";
	const authors = book.volumeInfo?.authors || book.authors || [];
	const description =
		book.volumeInfo?.description ||
		book.description ||
		"No description available";
	const thumbnail =
		book.volumeInfo?.imageLinks?.thumbnail || book.thumbnail_url;
	const bookId = book.google_book_id || book.id;

	const handleActionClick = () => {
		if (!isSaved) {
			toast({
				title: isSaved ? "Book Removed" : "Bookd Saved",
				description: isSaved
					? `The book "${title} has been successfully deleted."`
					: `The book "${title} has been successfully saved."`,
				duration: 3000,
			});
		}
		onAction(bookId);
	};

	return (
		<Card className="relative flex flex-col h-full">
			<CardHeader>
				<CardTitle className="flex justify-center items-center">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-grow mb-11">
				{thumbnail && (
					<img
						src={thumbnail}
						alt={title}
						className="w-full h-48 object-cover mb-4"
					/>
				)}
				<p className="font-bold mb-2 text-lg">{authors.join(", ")}</p>
				<p
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(description.substring(0, 100)),
					}}
				></p>
			</CardContent>
			<CardFooter className="absolute bottom-0 left-0 w-full flex p-4 justify-between">
				<Button asChild variant="outline">
					<Link to={`/book/${bookId}`}>View Details</Link>
				</Button>
				<Button
					onClick={handleActionClick}
					variant={isSaved ? "destructive" : "default"}
				>
					{isSaved ? "Delete" : "Save"}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default BookCard;
