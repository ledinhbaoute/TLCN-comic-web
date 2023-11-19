package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "genres")
public class Genre {
    @Id
    private String id;
    private String name;
    @ManyToMany(mappedBy = "genres")

    private List<ComicBook> comicBookList=new ArrayList<>();

//    public List<ComicBook> getComicBookList() {
//        return comicBookList;
//    }
//
//    public void setComicBookList(List<ComicBook> comicBookList) {
//        this.comicBookList = comicBookList;
//    }

    public Genre() {
    }

    public Genre(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (this==obj)
                return true;
        if(obj==null|| this.getClass()!=obj.getClass()) return false;
        Genre genre=(Genre) obj;
        return Objects.equals(name,genre.name);
    }
}
