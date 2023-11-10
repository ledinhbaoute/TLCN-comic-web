package vn.hcmute.tlcn.service;


import vn.hcmute.tlcn.entity.Genre;
import vn.hcmute.tlcn.model.AdminDTO;
import vn.hcmute.tlcn.model.GenreDTO;

import java.util.List;

public interface IGenreService {
    List<GenreDTO> getAllGenre();
    boolean addGenre(String name);
    int deleteGenre(String genreId);
    boolean updateGenre(String id,String newName);

}
