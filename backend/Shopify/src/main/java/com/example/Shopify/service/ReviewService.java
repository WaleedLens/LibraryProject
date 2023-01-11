package com.example.Shopify.service;


import com.example.Shopify.dao.BookRepository;
import com.example.Shopify.dao.ReviewRepository;
import com.example.Shopify.entity.Review;
import com.example.Shopify.models.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Objects;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;


    @Autowired
    public ReviewService(ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;

    }


    public void addReview(String userEmail, ReviewRequest reviewRequest) throws Exception{

        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail,reviewRequest.getBookId());

        if(validateReview !=null){
            throw new Exception("Review already created");

        }

        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);

        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(

                    Objects::toString

            ).orElse(null));



        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
        System.out.println("Review has been saved");

    }

    public boolean hasReviews(String userEmail,Long bookId){
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail,bookId);

        if(validateReview == null){
            return false;
        }else{
            return true;
        }

    }

}
