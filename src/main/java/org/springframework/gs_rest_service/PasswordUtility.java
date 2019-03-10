package org.springframework.gs_rest_service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

public class PasswordUtility {
	
	private static final Random RANDOM_NUMBER_GENERATOR = new SecureRandom();
	private static final int KEY_LENGTH = 256;
	
	public PasswordUtility() {}
	
	/** Generates a random 16 byte array, that will be used to salt passwords
	 * @return 16 byte salt array
	 */
	public static byte[] getNextSalt() {
		byte[] salt = new byte[16];
		RANDOM_NUMBER_GENERATOR.nextBytes(salt);
		return salt;
	}
	/**
	 * This function takes in a 16 byte salt and a password. Concatenates both
	 * and takes the hash. Then converts the hash to hexadecimal
	 * and returns the string equivalent.
	 * @param salt
	 * @param password
	 * @return hexadecimal string of the salted password
	 */
	public static String getSaltedHash(byte[] salt, char[] password) {
		
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			//Create saltedPassword byte array
			byte[] passwordInBytes = new String(password).getBytes();
			byte[] saltedPassword = new byte[salt.length + passwordInBytes.length];
			System.arraycopy(salt, 0, saltedPassword, 0, salt.length);
			System.arraycopy(passwordInBytes, 0, saltedPassword, salt.length, passwordInBytes.length);
			
			// get hash value of the salted password
			byte[] hashedBytes = digest.digest(saltedPassword);
			String hashedHexadecimal = convertByteArray2Hex(hashedBytes);
            
			return hashedHexadecimal;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	/** Converts a byte arrays to a hexadecimal string
	 * @param input
	 * @return hexadecimal string of a byte array
	 */
	public static String convertByteArray2Hex(byte[] input) {
		BigInteger num = new BigInteger(1, input);
		return num.toString(16);
	}
}
