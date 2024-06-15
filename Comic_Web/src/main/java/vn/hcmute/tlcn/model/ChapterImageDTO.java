package vn.hcmute.tlcn.model;

public class ChapterImageDTO {
    private int id;
    private String link;

    private int ordinalNumber;

    public ChapterImageDTO() {
    }
    public ChapterImageDTO( String link, int ordinalNumber) {

        this.link = link;
        this.ordinalNumber = ordinalNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

//    public ChapterDTO getChapter() {
//        return chapter;
//    }
//
//    public void setChapter(ChapterDTO chapter) {
//        this.chapter = chapter;
//    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public int getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(int ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }
}
