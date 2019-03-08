package org.springframework.gs_rest_service;


/**
 * @author brandon
 *	Test class I created via the spring tutorial
 */
public class Greeting {

	private final long id;
	private final String content;
	
	public Greeting(long id, String content) {
		this.id = id;
		this.content = content;
	}
	
	public long getId() {
		return id;
	}
	
	public String getContent() {
		return content;
	}
	
}
