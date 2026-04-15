package br.com.taskflow.model;
import jakarta.persistence.*; //fa o java conversar com o BD
import java.time.LocalDate;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

@Entity //pq essa clase vai virar uma tabela no BD
@Getter
@Setter

public class Tarefa {
    //ATRIBUTOS
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    private LocalDate dataEntrega;
    private String prioridade;
    private String status;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
