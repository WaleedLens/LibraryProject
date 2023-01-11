package com.example.Shopify.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

        public final static String JWTExtraction(String authToken,String extraction){
            authToken.replace("Bearer","");
            String[] chunks = authToken.split("\\.");


            Base64.Decoder decoder = Base64.getUrlDecoder();
            String payload = new String(decoder.decode(chunks[1]));



            String[] entries = payload.split(",");

            Map<String,String> map = new HashMap<String,String>();

            for(String entry : entries){
                String[] keyValue = entry.split(":");
                if(keyValue[0].equals(extraction)){
                    return keyValue[1].replace("\"","").replace("}",""); //return userEmail or sub
                }
            }
            return "not found";

        }
}
