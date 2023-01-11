package com.example.Shopify.controller;

import com.example.Shopify.dao.CheckoutRepository;
import com.example.Shopify.entity.Book;
import com.example.Shopify.service.BookService;
import com.example.Shopify.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api/books")
public class BookController {


    private BookService bookService;
    private final CheckoutRepository checkoutRepository;

    @Autowired
    public BookController(BookService bookService,
                          CheckoutRepository checkoutRepository){
        this.bookService = bookService;
        this.checkoutRepository = checkoutRepository;
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestHeader(value = "Authorization") String authToken,@RequestParam Long bookId) throws Exception{

        String userEmail = ExtractJWT.JWTExtraction(authToken,"\"sub\"");

        if(checkoutRepository.findCheckoutsByUserEmail(userEmail).size() < 5){
            return bookService.checoutBook(userEmail,bookId);
        }else{
            throw  new Exception("5/5");
        }
    }

    @GetMapping("/secure/ischecked")

    public boolean isChecked(@RequestHeader(value = "Authorization") String authToken,@RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJWT.JWTExtraction(authToken,"\"sub\"");

        return  bookService.isCheckedOut(userEmail,bookId);
    }

    @GetMapping("/secure/checkout/count")

    public int countCheckout(@RequestHeader(value = "Authorization") String authToken){
        System.out.println(authToken);
        String userEmail = ExtractJWT.JWTExtraction(authToken,"\"sub\"");
        System.out.println(userEmail);
        return bookService.countCheckout(userEmail);
    }


}
