package br.com.taskflow.controller;
import br.com.taskflow.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import br.com.taskflow.model.Usuario;

import java.util.Optional; // um tipo especial que pode ter um val9or ou estar vazi
@RestController // diz que esta classe é ima API
//uma API é como uma portinha que outros programas podem usar pára conversar com o sistema [

@RequestMapping ("/login") //diz que tudo comaça com login sera tratado aqui
//ex: http://localhost:8080/login

@CrossOrigin("*") //permite que qualquer site passa acessar essa API
//isso é importante quando o front-end(site) esta separado do back-end(JAVA)

//AQUI COMEÇA A CLASSE; PENSE NELA COMO UM PORTEIRO DO SISTEMA (API)

public class LoginController {

    @Autowired//spring vai criar automaticamente um objt UsuarioService e colocar aqui dentro
    //é como se alguem entregasse uma ferramenta pronta para vc usar

    private UsuarioService service;

    @PostMapping //singnifica que este metodo sera chamado quando alguem enviar dados usando POST
    //POST é usado quando queremos enviar informaçoes

    public Usuario login (
            @RequestBody Usuario usuario //email e senha
    ){
        Optional<Usuario> user = service.login( //verifica se o email e senha exitem // é como perguntar para o BD "esse user pode entrar?"
                usuario.getEmail(),
                usuario.getSenha()
        );
        return user.orElse(null); // se nao encontrar devolve usuario invalido
    }


}
