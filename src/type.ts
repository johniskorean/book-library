export interface Book {
	id: string;
	google_book_id?: string;
	volumeInfo?: {
		title: string;
		authors?: string[];
		description?: string;
		publishedDate?: string;
		pageCount?: number;
		categories?: string[];
		imageLinks?: {
			thumbnail?: string;
		};
	};
	title?: string;
	authors?: string[];
	description?: string;
	published_date?: string;
	thumbnail_url?: string;
}
