import React from "react";
import {
    PaginationContent,
    PaginationNext,
    PaginationPrevious,
    Pagination as WrapPagination
} from "./ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
    renderItem: (index: number) => JSX.Element;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    handlePageChange,
    renderItem
}) => {
    const renderPaginatedItems = () => {
        const items = [];
        const rangeStart = Math.max(1, currentPage - 2);
        const rangeEnd = Math.min(totalPages, currentPage + 2);

        for (let i = rangeStart; i <= rangeEnd; i++) {
            items.push(renderItem(i));
        }
        return items;
    };
    return (
        <WrapPagination>
            <PaginationContent>
                <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                />
                {renderPaginatedItems()}
                <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                />
            </PaginationContent>
        </WrapPagination>
    );
};

export default Pagination;
