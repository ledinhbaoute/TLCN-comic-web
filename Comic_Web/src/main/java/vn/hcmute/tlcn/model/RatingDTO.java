package vn.hcmute.tlcn.model;


public class RatingDTO {
    private UserDTO user;
    private ComicBookDTO comicBook;
    private int score;
    private String comment;

    public RatingDTO() {
    }

    public RatingDTO(UserDTO user, ComicBookDTO comicBook, int score, String comment) {
        this.user = user;
        this.comicBook = comicBook;
        this.score = score;
        this.comment = comment;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public ComicBookDTO getComicBook() {
        return comicBook;
    }

    public void setComicBook(ComicBookDTO comicBook) {
        this.comicBook = comicBook;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
