package pe.edu.upeu.bomerp;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI odontoSysOpenApi() {
        return new OpenAPI().info(new Info()
                .title("API Clínica Odontológica - OdontoSys")
                .version("1.0.0")
                .description("Contrato REST de la plataforma de gestión odontológica OdontoSys"));
    }
}