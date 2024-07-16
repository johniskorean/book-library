import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRef } from "react";

interface LinkType {
    href: string;
    label: string;
}

const links: LinkType[] = [
    { href: "/saved-books", label: "Saved Books" },
    { href: "/contact", label: "Contact" }
];

const Header: React.FC = () => {
    const navigate = useNavigate();
    const closeRef = useRef<HTMLButtonElement>(null);

    const handleClick = (href: string) => {
        closeRef.current?.click();
        setTimeout(() => navigate(href), 0);
    };

    return (
        <header className="bg-blue-600 text-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary">
                    Book Library
                </Link>
                <nav className="hidden md:flex space-x-4">
                    {links.map((link) => (
                        <Button asChild variant="ghost" key={link.label}>
                            <Link to={link.href}>{link.label}</Link>
                        </Button>
                    ))}
                </nav>
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="outline" size="icon">
                            <Menu className="h-6 w-6 text-black"></Menu>
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <DialogTitle>
                            <VisuallyHidden>Menu</VisuallyHidden>
                            <VisuallyHidden>
                                <DialogDescription>
                                    Description
                                </DialogDescription>
                            </VisuallyHidden>
                        </DialogTitle>
                        <nav className="flex flex-col space-y-4 items-center justify-center h-full text-lg">
                            {links.map((link) => (
                                <Button
                                    asChild
                                    key={link.label}
                                    variant="ghost"
                                    onClick={() => handleClick(link.href)}
                                >
                                    <Link to={link.href}>{link.label}</Link>
                                </Button>
                            ))}
                        </nav>
                        <SheetClose ref={closeRef} />
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Header;
