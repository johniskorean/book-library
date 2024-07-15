import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBooksDetails } from "../api/books";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Book } from "../type.ts";
import DOMPurify from "dompurify";

const Books: React.FC = () => {
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { id } = useParams<{ id: string }>();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchBookDetails = async () => {
			try {
				setLoading(true);
				const data = await getBooksDetails(id!);
				setBook(data);
			} catch (error) {
				setError("Failed to fetch book details");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchBookDetails();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!book) return <div>No book found</div>;

	return (
		<div className="container mx-auto px-4 py-8">
			<Card>
				<CardHeader>
					<CardTitle>{book.volumeInfo?.title}</CardTitle>
				</CardHeader>
				<CardContent>
					{book.volumeInfo?.imageLinks?.thumbnail && (
						<img
							src={book.volumeInfo.imageLinks.thumbnail}
							alt={book.volumeInfo.title}
							className="w-full h-auto object-cover mb-4"
						/>
					)}
					<p>
						<strong>Author(s):</strong>{" "}
						{book.volumeInfo?.authors?.join(", ") || "Unknown"}
					</p>
					<p>
						<strong>Published Date:</strong>{" "}
						{book.volumeInfo?.publishedDate || "Unknown"}
					</p>
					<p>
						<strong>Page Count:</strong>{" "}
						{book.volumeInfo?.pageCount || "Unknown"}
					</p>
					<p>
						<strong>Categories:</strong>{" "}
						{book.volumeInfo?.categories?.join(", ") || "Unknown"}
					</p>
					<p className="mt-4">
						<strong>Description:</strong>
					</p>
					<p
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(
								book.volumeInfo?.description || "No description avaiable"
							),
						}}
					></p>
				</CardContent>
			</Card>
			<div className="m-4">
				{/* TODO: Add Toaster for deleting the book */}
				<Button onClick={() => navigate(-1)}>Back to Search</Button>
			</div>
		</div>
	);
};

export default Books;
