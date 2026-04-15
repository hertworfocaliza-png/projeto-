package br.com.taskflow.service;
import br.com.taskflow.model.Usuario; //Representa a pessoa que vai fazer o login

import br.com.taskflow.repository.UsuarioRepository;// Quem conversa diretamente com o Banco
import org.springframework.beans.factory.annotation.Autowired; // Repositorio pronto para uso
import org.springframework.stereotype.Service;
import java.util.Optional; //tipo especial que pode ter um valor ou estar vazio\
@Service //significa que aqui tem um aregra de negocio
public class UsuarioService {
    @Autowired //permite que a gente busque no BD
    private UsuarioRepository repository;

    //metodo responsavel pelo Login

    public Optional<Usuario> login(
            String email,
            String senha
    ){
        return repository
                .findByEmailAndSenha(
                        email,
                        senha
                );
    }
}
