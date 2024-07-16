import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialInput: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialInput }) => {
    const [input, setInput] = useState(initialInput);

    useEffect(() => {
        setInput(initialInput);
    }, [initialInput]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(input);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 px-1"
        >
            <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for books"
            />
            <Button type="submit" className="bg-blue-500">
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
