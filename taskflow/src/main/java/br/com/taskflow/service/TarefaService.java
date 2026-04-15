package br.com.taskflow.service;
import br.com.taskflow.model.Tarefa;
import br.com.taskflow.repository.TarefaRepository;
import org.springframework.stereotype.Service; //responsavel pela logica do sistema
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class TarefaService {
    private final TarefaRepository repository;
    public TarefaService(TarefaRepository repository) {
        this.repository = repository;
    }

    public List<Tarefa> listarTodas() {
        return repository.findAll();
    }

    public Tarefa salvar(@RequestBody Tarefa tarefa) {
        return repository.save(tarefa);
    }
    public void excluir(Long id){
        repository.deleteById(id);
    }
    public Tarefa atualizar(Long id,Tarefa tarefaAtualizada){
        Tarefa tarefa = repository.findById(id).orElseThrow();
        tarefa.setTitulo(tarefaAtualizada.getTitulo());
        tarefa.setDescricao(tarefaAtualizada.getDescricao());
        tarefa.setDataEntrega(tarefaAtualizada.getDataEntrega());
        tarefa.setPrioridade(tarefaAtualizada.getPrioridade());
        tarefa.setStatus(tarefaAtualizada.getStatus());
        tarefa.setUsuario(tarefaAtualizada.getUsuario());

        return repository.save(tarefa);
    }
}
