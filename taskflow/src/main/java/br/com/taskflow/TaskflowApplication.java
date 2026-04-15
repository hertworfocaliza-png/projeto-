package br.com.taskflow;

import br.com.taskflow.model.Usuario;
import br.com.taskflow.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TaskflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskflowApplication.class, args);
	}

	@Bean
	CommandLineRunner init(UsuarioRepository repository) {
		return args -> {
			// Verifica se já existe algum usuário para não criar duplicado
			if (repository.count() == 0) {
				Usuario admin = new Usuario();
				admin.setEmail("teste@email.com");
				admin.setSenha("123");

				repository.save(admin);
				System.out.println("-----------------------------------------");
				System.out.println("USUÁRIO DE TESTE CRIADO COM SUCESSO!");
				System.out.println("Login: teste@email.com / Senha: 123");
				System.out.println("-----------------------------------------");
			}
		};
	}
}