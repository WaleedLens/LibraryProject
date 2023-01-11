package com.example.Shopify.service;

import com.example.Shopify.dao.BookRepository;
import com.example.Shopify.dao.CheckoutRepository;
import com.example.Shopify.entity.Book;
import com.example.Shopify.entity.Checkout;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {
    private BookRepository bookRepository;

    private CheckoutRepository checkoutRepository;


    public BookService(BookRepository bookRepository,CheckoutRepository checkoutRepository){
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }


    public Book checoutBook(String userEmail,Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail,bookId);

        if(!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <=0){
            throw new Exception("Book doesn't exist");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() -1);
        bookRepository.save(book.get());

        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(),LocalDate.now().plusDays(7).toString(),book.get().getId());

        checkoutRepository.save(checkout);

        return book.get();


    }

    public boolean isCheckedOut(String userEmail,Long bookId){

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail,bookId);

        if(validateCheckout == null){return false;}else{return true;}

    }


    public int countCheckout(String userEmail){
        return checkoutRepository.findCheckoutsByUserEmail(userEmail).size();
    }
}
