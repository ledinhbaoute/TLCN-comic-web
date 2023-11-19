package vn.hcmute.tlcn.utils;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import vn.hcmute.tlcn.entity.*;
import vn.hcmute.tlcn.model.*;

@Component
public class Converter {
    private final ModelMapper modelMapper;
    public Converter(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    public GenreDTO convertEntityToDto(Genre genre){
        return modelMapper.map(genre,GenreDTO.class);
    }
    public ComicBookDTO convertEntityToDto(ComicBook comicBook){
        return modelMapper.map(comicBook,ComicBookDTO.class);
    }
    public ChapterDTO convertEntityToDto(Chapter chapter){
        return modelMapper.map(chapter,ChapterDTO.class);
    }
    public AdminDTO convertEntityToDto(Admin admin){
        return modelMapper.map(admin,AdminDTO.class);
    }
    public UserDTO convertEntityToDto(User user){
        return modelMapper.map(user,UserDTO.class);
    }
    public CommentDTO convertEntityToDto(Comment comment){return modelMapper.map(comment,CommentDTO.class);}
    public RatingDTO convertEntityToDto(Rating rating){
        UserDTO userDTO=this.convertEntityToDto(rating.getUser());
        ComicBookDTO comicBookDTO=this.convertEntityToDto(rating.getComicBook());
        return new RatingDTO(userDTO,comicBookDTO,rating.getScore(),rating.getComment());
    }
    public FavoriteComicDTO convertEntityToDto(FavoriteComic favoriteComic){
        UserDTO userDTO=this.convertEntityToDto(favoriteComic.getUser());
        ComicBookDTO comicBookDTO=this.convertEntityToDto(favoriteComic.getComicBook());
        return new FavoriteComicDTO(userDTO,comicBookDTO);
    }
    public ChapterImageDTO convertEntityToDto(ChapterImage chapterImage){
        return modelMapper.map(chapterImage,ChapterImageDTO.class);
    }
    public Genre convertDtoToEntity(GenreDTO genreDTO){
        return modelMapper.map(genreDTO,Genre.class);
    }
    public ComicBook convertDtoToEntity(ComicBookDTO comicBookDTO){
        return modelMapper.map(comicBookDTO,ComicBook.class);
    }

}
