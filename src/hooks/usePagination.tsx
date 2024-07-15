import { MutableRefObject, useRef, useState } from "react";

interface PaginationResult<T> {
	currentPage: number;
	totalPages: number;
	handlePageChange: (page: number) => void;
	paginatedItems: (items: T[]) => T[];
	ref: MutableRefObject<HTMLDivElement | null>;
}

const usePagination = <T,>(
	totalItems: number,
	itemsPerPage: number
): PaginationResult<T> => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const ref = useRef<HTMLDivElement | null>(null);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
			ref.current?.scrollIntoView({ behavior: "smooth" });
		}
	};

	const paginatedItems = (items: T[]): T[] => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return items.slice(startIndex, startIndex + itemsPerPage);
	};

	return { currentPage, totalPages, handlePageChange, paginatedItems, ref };
};
export default usePagination;
