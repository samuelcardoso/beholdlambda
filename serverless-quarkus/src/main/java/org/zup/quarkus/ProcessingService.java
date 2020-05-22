package org.zup.quarkus;

import com.sun.jna.Native;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProcessingService {

    public static final String CAN_ONLY_GREET_NICKNAMES = "Can only greet nicknames";

    public OutputObject process(InputObject input) {
        if (input.getName().equals("Stuart")) {
            throw new IllegalArgumentException(CAN_ONLY_GREET_NICKNAMES);
        }
        // System.setProperty("java.library.path", "/home/samuel/desenv/workspaces/zup/si2/nativesamples/serverless-quarkus/src/META-INF/resources/");
        // String dir = System.getProperty("user.dir");
        // System.out.println("current dir = " + dir);
        // String filePath = getClass().getClassLoader().getResource("libsomadorJNA.so").getFile();
        // System.out.println("path = " + filePath);
        CalculadoraJNA calculadora = (CalculadoraJNA) Native.load("libsomadorJNA.so", CalculadoraJNA.class);
        String result = "Saida: " + calculadora.soma(1, 2);
        OutputObject out = new OutputObject();
        out.setResult(result);
        return out;
    }
}
