package com.example.Shopify.config;

import com.example.Shopify.entity.Book;
import com.example.Shopify.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {
    private String allowedOrigins = "http://localhost:3000";


    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] UnsupportedActions = {HttpMethod.DELETE,HttpMethod.POST,HttpMethod.PATCH,HttpMethod.PUT};


        config.exposeIdsFor(Book.class);

        disableHttpMethods(Book.class, config,UnsupportedActions);


        config.exposeIdsFor(Review.class);

        disableHttpMethods(Review.class, config,UnsupportedActions);

        /* Handle CORS */

        cors.addMapping(config.getBasePath()+"/**")
                .allowedOrigins(allowedOrigins);

    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config,HttpMethod[] UnsupportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(UnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(UnsupportedActions));

    }
}
