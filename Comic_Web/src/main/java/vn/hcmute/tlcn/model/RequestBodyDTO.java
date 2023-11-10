package vn.hcmute.tlcn.model;

public class RequestBodyDTO {
    String username;
    String password;
    ComicBookDTO object;

    public RequestBodyDTO() {
    }

    public RequestBodyDTO(String username, String password, ComicBookDTO object) {
        this.username = username;
        this.password = password;
        this.object = object;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ComicBookDTO getObject() {
        return object;
    }

    public void setObject(ComicBookDTO object) {
        this.object = object;
    }
}
