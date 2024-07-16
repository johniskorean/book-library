import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./components/Home";
import Books from "./components/Books";
import SavedBooks from "./components/SavedBooks";
import Contact from "./components/Contact";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<Books />} />
                <Route path="/saved-books" element={<SavedBooks />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
    );
}

export default App;
