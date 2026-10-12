package pe.edu.upeu.bomerp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class BomerpBackendApplication {

	static {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		System.setProperty("user.timezone", "UTC");
		System.setProperty("oracle.jdbc.timezoneAsRegion", "false");
	}

	public static void main(String[] args) {
		SpringApplication.run(BomerpBackendApplication.class, args);
	}

}
