package com.jonathan.crudspring.model;



import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data // Adiciona os métodos Getter/Setter/toString etc via Lombok
@Entity // Especifica que a classe é uma entidade (banco de dados)
public class Course {
    
    @Id // indica que o atributo é uma chave primária
    @GeneratedValue(strategy = GenerationType.AUTO) // autoinsere o valor do identificador
    @JsonProperty("_id") // Personaliza o nome do atributo na hora de ir para o JSON
    private Long id;

    // Limita o dado a 200 caracteres // Torna o preenchimento obrigatório
    @NotBlank
    @NotNull
    @Length(min = 5, max = 100)
    @Column(length = 100, nullable = false)
    private String name;

    @NotNull
    @Length(max = 10)
    @Pattern(regexp = "Back-end|Front-end")
    @Column(length = 10, nullable = false)
    private String category;
}
