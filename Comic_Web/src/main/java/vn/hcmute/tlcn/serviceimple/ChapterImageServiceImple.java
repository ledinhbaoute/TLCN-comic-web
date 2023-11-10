package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.ChapterImage;
import vn.hcmute.tlcn.model.ChapterImageDTO;
import vn.hcmute.tlcn.repository.ChapterImageRepository;
import vn.hcmute.tlcn.service.IChapterImageService;
import vn.hcmute.tlcn.utils.Converter;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChapterImageServiceImple implements IChapterImageService {
    @Autowired
    private ChapterImageRepository chapterImageRepository;
    @Autowired
    private Converter converter;

    @Override
    public List<ChapterImageDTO> getImagesByChapter(String chapterId) {
        List<ChapterImage>chapterImages=chapterImageRepository.findByChapter_Id(chapterId);
        List<ChapterImageDTO>chapterImageDTOS=new ArrayList<>();
        for (ChapterImage chapterImg:chapterImages
             ) {
            chapterImageDTOS.add(converter.convertEntityToDto(chapterImg));
        }
        return chapterImageDTOS;
    }
}
