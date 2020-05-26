package org.zup.quarkus;

import com.sun.jna.Native;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProcessingService {
    public OutputObject process(InputObject input) {
        OutputObject out = new OutputObject();
        out.setResult("Hello World");
        return out;
    }
}
