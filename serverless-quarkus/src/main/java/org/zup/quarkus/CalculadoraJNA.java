package org.zup.quarkus;

import com.sun.jna.Library;

public interface CalculadoraJNA extends Library {
	public int soma(int num1, int num2);
}