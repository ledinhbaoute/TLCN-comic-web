package vn.hcmute.tlcn.model;

public class FavoriteComicDTO {
    private UserDTO userDTO;
    private ComicBookDTO comicBookDTO;

    public FavoriteComicDTO() {
    }
    public FavoriteComicDTO(UserDTO userDTO, ComicBookDTO comicBookDTO) {
        this.userDTO = userDTO;
        this.comicBookDTO = comicBookDTO;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public ComicBookDTO getComicBookDTO() {
        return comicBookDTO;
    }

    public void setComicBookDTO(ComicBookDTO comicBookDTO) {
        this.comicBookDTO = comicBookDTO;
    }
}
