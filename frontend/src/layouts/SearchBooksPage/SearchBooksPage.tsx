import { useEffect, useState } from 'react';
import Bookmodel from "../../models/Bookmodel";
import { Pagination } from '../Utils/Pagination';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchBooks } from './Components/SearchBooks';

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<Bookmodel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountBooks, setTotalAmountBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const[categorySelection,setCategorySelection] = useState("Book category");
    useEffect(() => {
        const fetchBooks = async () => {
            const baseURL: string = "http://localhost:8080/api/books";

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseURL}?page=${currentPage - 1}&size=${booksPerPage}`
            } else {
                url = baseURL + searchUrl;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseJson = await response.json()
            const responseData = responseJson._embedded.books;

            setTotalAmountBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: Bookmodel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }
            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);         //setIsLoading to false 
            setHttpError(error.message);//setError Message in httpError
        });
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl])//Fires if anything in this array changes


    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size${booksPerPage}`);
    
        }
 
    }

    const categoryField = (value: string) =>{
        if(value.toLocaleLowerCase() === 'fe' || 
        value.toLocaleLowerCase() === 'be' ||
        value.toLocaleLowerCase() === 'data' ||
        value.toLocaleLowerCase() === 'devops'
        ){
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=0&size=${booksPerPage}`)

        }else{
            setCategorySelection('All');
            setSearchUrl(`?page=0&size=${booksPerPage}`);
        }
    }
    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountBooks ? booksPerPage * currentPage : totalAmountBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div>
            <div className='container'>
                <div className=''>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' area-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <button className='btn btn-outline-success' onClick={() => searchHandleChange()}>Search</button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' area-expanded='false'>
                                   {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('All')}>
                                        <a href="#" className='dropdown-item'>All</a>
                                    </li>

                                    <li onClick={() => categoryField('FE')} >
                                        <a href="#" className='dropdown-item'>Front End</a>
                                    </li>
                                    <li onClick={() => categoryField('BE')}>
                                        <a href="#" className='dropdown-item'>Back End</a>
                                    </li>
                                    <li onClick={() => categoryField('Data')}>
                                        <a href="#" className='dropdown-item'>Data</a>
                                    </li>
                                    <li onClick={() => categoryField('DevOps')}>
                                        <a href="#" className='dropdown-item'>DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountBooks > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountBooks})</h5>
                            </div>
                            <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountBooks} items: </p>
                            {books.map(book => (
                                <SearchBooks book={book} key={book.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <a href="#" type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white '>Library Services</a>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />

                    }
                </div>
            </div>
        </div>
    );
}