package br.com.taskflow.repository;
import org.springframework.data.jpa.repository.JpaRepository; //possui vario metodos prontos
import java.util.Optional;
import br.com.taskflow.model.Usuario;

//criamos uma interface pq ela vai possuir varios metodos prontos
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
   Optional <Usuario> findByEmailAndSenha(//tetodo personalizado que busca o usuario
        String email,
        String Senha
   );
}

