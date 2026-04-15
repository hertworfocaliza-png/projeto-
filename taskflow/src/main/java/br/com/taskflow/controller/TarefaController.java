package br.com.taskflow.controller;
import br.com.taskflow.model.Tarefa;
import br.com.taskflow.service.TarefaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //diz que esta classe é uma API
//Uma API é como uma portinha que outros programas podem usar para conversar com o sistema

@RequestMapping ("/tarefas") // diz que tudo começa com login sera tratado aqui
//ex: http://localhost:8080/login

@CrossOrigin("*") // Permite que qualquer site possa acessar essa API
//isso é importante quando o front-end(site) esta separado do back-end (JAVA)

//aqui começa a classe, pense nela como um PORTEIRO do sistema (API)

public class TarefaController {
    private final TarefaService service;

    public TarefaController(TarefaService service) {
        this.service = service;
    }
    public List<Tarefa> listar(){
        return service.listarTodas();
    }
    @PostMapping

    public Tarefa salvar(@RequestBody Tarefa tarefa){

        return service.salvar(tarefa);
    }
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){

        service.excluir(id);
    }
    @PutMapping("/{id}")
    public Tarefa atualizar(
            @PathVariable Long id,
            @RequestBody Tarefa tarefa
    ){
        return service.atualizar(id, tarefa);
    }

}
