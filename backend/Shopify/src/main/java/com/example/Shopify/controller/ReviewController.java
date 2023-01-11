package com.example.Shopify.controller;

import com.example.Shopify.models.ReviewRequest;
import com.example.Shopify.service.ReviewService;
import com.example.Shopify.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;


    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }


    @PostMapping("/secure")

    public void postReview(@RequestHeader(value="Authorization") String token, @RequestBody ReviewRequest reviewRequest) throws Exception{
        String userEmail = ExtractJWT.JWTExtraction(token,"\"sub\"");

        if(userEmail == null){throw new Exception(("User email is missing"));}
        reviewService.addReview(userEmail,reviewRequest);


    }

    @GetMapping("/secure/user/book")
    public boolean reviewBookByUser(@RequestHeader(value="Authorization") String token,@RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJWT.JWTExtraction(token,"\"sub\"");


        if(userEmail == null){
            throw new Exception("user email is missing");
        }

        return reviewService.hasReviews(userEmail,bookId);



    }

}
