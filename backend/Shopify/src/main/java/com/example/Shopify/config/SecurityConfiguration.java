package com.example.Shopify.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        //Disable CORS

        http.csrf().disable();

        //Protect endpoints

        http.authorizeRequests(configurer -> configurer.antMatchers(("/api/books/secure/**"),("/api/reviews/secure/**"))

                        .authenticated())
                .oauth2ResourceServer()
                .jwt();


        http.cors();

        http.setSharedObject(ContentNegotiationStrategy.class,new HeaderContentNegotiationStrategy());


        Okta.configureResourceServer401ResponseBody(http);


        return http.build();
    }



}
