import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import Bookmodel from "../../models/Bookmodel";
import Reviewmodel from "../../models/Reviewmodel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutReviewBox } from "./CheckoutReviewBox";
import { LatestReviews } from "./LatestReviews";

export const CheckoutPage = () => {
    const { authState } = useOktaAuth();
    const [book, setBook] = useState<Bookmodel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Review state

    const [reviews, setReviews] = useState<Reviewmodel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isReviewLeftLoading, setIsReviewLeftLoading] = useState(true);

    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingCheckedOut, setIsLoadingCheckedOut] = useState(true);

    const bookId = (window.location.pathname).split("/")[2]; // get bookId from pathUrl (foo/boo/:bookId)






    useEffect(() => {
        const fetchBook = async () => {
            const baseURL: string = `http://localhost:8080/api/books/${bookId}`;


            const response = await fetch(baseURL);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseJson = await response.json()

            const fetchedBook: Bookmodel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            }

            setBook(fetchedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);         //setIsLoading to false 
            setHttpError(error.message);//setError Message in httpError
        });
    }, [isCheckedOut])//Fires if anything in this array changes

    useEffect(() => {
        const fetchReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error("Error:unable to fetch reviews.");
            }


            const responseJsonReviews = await responseReviews.json();

            const responseDataReviews = responseJsonReviews._embedded.reviews;

            const loadedReviews: Reviewmodel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseDataReviews) {
                loadedReviews.push({
                    id: responseDataReviews[key].id,
                    userEmail: responseDataReviews[key].useState,
                    reviewDescription: responseDataReviews[key].reviewDescription,
                    book_id: responseDataReviews[key].bookId,
                    date: responseDataReviews[key].date,
                    rating: responseDataReviews[key].rating
                });

                weightedStarReviews = weightedStarReviews + responseDataReviews[key].rating;

            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));

            }
            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        });
    }, []);
    useEffect(() => {
        const checkReviews = async () => {
            if (authState && authState.isAuthenticated) {
                const url: string = `http://localhost:8080/api/reviews/secure/user/book?bookId=${bookId}`;

                const requestOptions = {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const checkReviews = await fetch(url, requestOptions);


                if (!checkReviews.ok) {
                    throw new Error("Error:unable to fetch count.");
                }

            }
            setIsLoadingReview(false);
        }

        checkReviews().catch((error:any) =>{
            setIsLoadingReview(false);
            setHttpError(error.message);
        });
    },[authState]);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const secureUrl: string = `http://localhost:8080/api/books/secure/checkout/count`;
                const requestOptions = {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentCountOfuser = await fetch(secureUrl, requestOptions);


                if (!currentCountOfuser.ok) {
                    throw new Error("Error:unable to fetch count.");
                }
                const currentCountResponse = await currentCountOfuser.json();
                setCurrentLoansCount(currentCountResponse);
            }
            setIsLoadingCurrentLoansCount(false);
        }

        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);


    useEffect(() => {
        const fetchUserCheckedoutBook = async () => {
            if (authState && authState?.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/ischecked?bookId=${bookId}`;
                const requestOptions = {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const bookCheckedOut = await fetch(url, requestOptions);

                if (!bookCheckedOut.ok) {
                    throw new Error("Something went wrong [check CheckoutPage.tsx]");

                }
                const bookCheckoutResponse = await bookCheckedOut.json();

                setIsCheckedOut(bookCheckoutResponse);

            }
            setIsLoadingCheckedOut(false);
        }

        fetchUserCheckedoutBook().catch((error: any) => {
            setIsLoadingCheckedOut(false);
            setHttpError(error.message);
        });
    }, [authState, isCheckedOut]);



    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingCheckedOut) {
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


    async function doCheckout() {
        const secureUrl: string = `http://localhost:8080/api/books/secure/checkout?bookId=${bookId}`;
        const requestOptions = {
            method: 'put',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const currentCountOfuser = await fetch(secureUrl, requestOptions);


        if (!currentCountOfuser.ok) {
            throw new Error("Error:unable to fetch count.");
        }
        setIsCheckedOut(true);
    }


    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt='book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} alt="book" width='226' height='349' />
                        }
                    </div>

                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} doCheckout={doCheckout} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={Number(bookId)} mobile={false} />
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt='book' />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} alt="book" width='226' height='349' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview rating={totalStars} size={32} />

                    </div>

                </div>
                <CheckoutReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} doCheckout={doCheckout} />
                <hr />
                <LatestReviews reviews={reviews} bookId={Number(bookId)} mobile={true} />

            </div>
        </div>


    );
}