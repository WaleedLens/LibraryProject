package com.example.Shopify.dao;

import com.example.Shopify.entity.Checkout;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout,Long> {

    Checkout findByUserEmailAndBookId(String userEmail,Long bookId);

    List<Checkout> findCheckoutsByUserEmail(String userEmail);


}
