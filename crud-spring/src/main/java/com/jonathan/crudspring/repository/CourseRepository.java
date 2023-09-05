package com.jonathan.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jonathan.crudspring.model.Course;

// JpaRepository usa o modelo da classe e o tipo do atributo com chave primária
// Isso permite utilizar os métodos do JPA 
// @Repository é para transações com um banco de dados (comandos etc)

@Repository // anotação para interfaces, permite estender interfaces do JPA para o SpringData
public interface CourseRepository extends JpaRepository<Course, Long> { 


}
