package org.springframework.gs_rest_service;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;

/**Hello Master Yoda, I created this using a guide found here:
 * https://spring.io/guides/gs/rest-service/
 */

@RestController
public class ApiController {

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();
	
	@RequestMapping(value = "/")
	public String index( ) {
		return "This is the home page. Server is up and running\n\r";
	}
	
	@RequestMapping(value = "/testGet", method = RequestMethod.GET)
	public Greeting greeting(@RequestParam(value="name", defaultValue="Click again! See what happens...") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(@RequestBody String login) {
		
		ObjectMapper mapper = new ObjectMapper();
		Login userLogin = null;
		JWT jwt;
		String token = "";
		String loginSuccess = "false";
		
		try {
			userLogin = mapper.readValue(login, Login.class);
			
//			Debugging Test
			System.out.println(userLogin.getUsername());
			System.out.println(userLogin.getPassword());
			
			//This verifies the user login, eventually this login 
			//will need to be created in the authentication class
			//this is just dummy data for developing the app
			if(userLogin.getUsername().equals("hand") && userLogin.getPassword().equals("password")) {
				jwt = new JWT();
				token = jwt.createJWT(userLogin.getUsername(), "SpringServer", "", 0);
				loginSuccess = "true";
			}
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// Helpful tutorial on using JSON:
		// https://www.youtube.com/watch?v=wDVH3qnXv74
		JSONObject json = new JSONObject();
		json.put("success", loginSuccess);
		json.put("token", token);
		
		return json.toString();
	}
}