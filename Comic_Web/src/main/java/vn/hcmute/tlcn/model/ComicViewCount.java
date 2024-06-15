package vn.hcmute.tlcn.model;

import vn.hcmute.tlcn.entity.ComicBook;

public class ComicViewCount {
    private ComicBook comicBook;
    private long viewCount;

    public ComicBook getComicBook() {
        return comicBook;
    }

    public void setComicBook(ComicBook comicBook) {
        this.comicBook = comicBook;
    }

    public long getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public ComicViewCount(ComicBook comicBook, long viewCount) {
        this.comicBook = comicBook;
        this.viewCount = viewCount;
    }

    public ComicViewCount() {
    }
}
