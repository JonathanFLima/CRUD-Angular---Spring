package com.jonathan.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.jonathan.crudspring.model.Course;
import com.jonathan.crudspring.repository.CourseRepository;



@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
		
	}

	@Bean
	CommandLineRunner initDatabase(CourseRepository courseRepository) {
		return args -> { 

			courseRepository.deleteAll(
				
			);
			Course c1 = new Course();
			c1.setName("Angular + Spring");
			c1.setCategory("front-end");

			Course c2 = new Course();
			c2.setName("Angular");
			c2.setCategory("front-end");

			Course c3 = new Course();
			c3.setName("Angular.JS");
			c3.setCategory("back-end");

			Course c4 = new Course();
			c4.setName("Java");
			c4.setCategory("back-end");

			courseRepository.save(c1);
			courseRepository.save(c2);
			courseRepository.save(c3);
			courseRepository.save(c4);

			
		};
	}
}
