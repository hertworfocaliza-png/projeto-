package br.com.taskflow.repository;
import br.com.taskflow.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository; // possui varios metodos prontos

//Criamos uma interface porque ela vai possuir varios metodos prontos

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    //naoo precisamos escrever nada aqui
    // automaticamente ja cria varios metodos
}
