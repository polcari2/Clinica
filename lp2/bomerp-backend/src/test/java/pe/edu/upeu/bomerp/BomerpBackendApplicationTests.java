package pe.edu.upeu.bomerp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.TimeZone;

@SpringBootTest
@ActiveProfiles("dev")
class BomerpBackendApplicationTests {

	static {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		System.setProperty("user.timezone", "UTC");
		System.setProperty("oracle.jdbc.timezoneAsRegion", "false");
	}

	@Test
	void contextLoads() {
	}

}
