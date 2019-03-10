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
		JSONObject json = new JSONObject();
		
		try {
			userLogin = mapper.readValue(login, Login.class);
			
			byte[] salt = PasswordUtility.getNextSalt();
			String saltAndHashPassword = PasswordUtility.getSaltedHash(salt, userLogin.getPassword());
			
			// Show what's going on behind the scenes
			// The database will need to store:
			// 	1.) userLogin.getUsername()
			//  2.) salt
			//  3.) saltAndHashPassword
			System.out.printf("User: %s\tpass: %s\tsalt: %s\thash: %s\t",userLogin.getUsername(), 
																		new String(userLogin.getPassword()), 
																		PasswordUtility.convertByteArray2Hex(salt), 
																		saltAndHashPassword);
			
			
			//This verifies the user login, eventually this login 
			//will need to be created in the authentication class
			//this is just dummy data for developing the app
			if(userLogin.getUsername().equals("hand") && (new String(userLogin.getPassword())).equals("password")) {
				JWT jwt = new JWT();
				String token = jwt.createJWT(userLogin.getUsername(), "SpringServer", "", 0);
				json.put("success", "true");
				json.put("token", token);
				System.out.println("Success.");
				return json.toString();
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
		json.put("success", "false");
		json.put("token", "");
		System.out.println("Failed.");
		return json.toString();
	}
}