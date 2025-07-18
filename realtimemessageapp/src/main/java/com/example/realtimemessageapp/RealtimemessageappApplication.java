package com.example.realtimemessageapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;


@SpringBootApplication
@PropertySource("classpath:secret.properties")
public class RealtimemessageappApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealtimemessageappApplication.class, args);
	}

}
