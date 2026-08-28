package com.qem.postboard;

import org.springframework.boot.SpringApplication;	
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@SpringBootApplication
// Aggiungi questa riga per stabilizzare il JSON della paginazione!
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
public class PostboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostboardApplication.class, args);
	}
}