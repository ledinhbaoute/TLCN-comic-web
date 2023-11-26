package vn.hcmute.tlcn.utils;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class GenerateId {
    public String generateId(){
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString().substring(0,15);
        return id;
    }
}
