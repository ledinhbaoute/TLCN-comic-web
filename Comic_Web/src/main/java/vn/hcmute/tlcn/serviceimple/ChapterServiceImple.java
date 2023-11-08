package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.converter.Converter;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.model.ChapterDTO;
import vn.hcmute.tlcn.repository.ChapterRepository;
import vn.hcmute.tlcn.service.IChapterService;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChapterServiceImple implements IChapterService {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private Converter converter;
    @Override
    public List<ChapterDTO> getChapterByComic(String comicId) {
        List<ChapterDTO>chapterDTOS=new ArrayList<>();
        List<Chapter>chapters=chapterRepository.findByComicBook_Id(comicId);
        for (Chapter chapter:chapters
             ) {
            chapterDTOS.add(converter.convertEntityToDto(chapter));
        }
        return chapterDTOS;
    }
}
