package com.jonathan.crudspring.controller;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jonathan.crudspring.model.Course;
import com.jonathan.crudspring.repository.CourseRepository;

// A anotação @AllArgsConstructor coloca todos os atributos da classe no construtor
@RestController // Serve para dizer que a classe tem um endpoint / Terá os métodos para se trabalhar com API
@RequestMapping("/api/courses") //
public class CourseController {

    private final CourseRepository courseRepository;

    // Tendo o construtor com o repositório de cursos faz com que
    // seja obrigatória a instância deste objeto
    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    //@RequestMapping(method = RequestMethod.GET) é o mesmo que @GetMapping
    @GetMapping
    public List<Course> list() {
        return courseRepository.findAll();
      }
       
}
