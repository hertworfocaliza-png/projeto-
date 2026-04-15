package br.com.taskflow.model;
import jakarta.persistence.*; //fa o java conversar com o BD
import java.time.LocalDate;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;
import br.com.taskflow.model.Tarefa;

@Entity //pq essa clase vai virar uma tabela no BD
@Getter
@Setter

public class Usuario {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String senha;

}
