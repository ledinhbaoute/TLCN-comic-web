package vn.hcmute.tlcn.service;

import vn.hcmute.tlcn.model.ChapterImageDTO;

import java.util.List;

public interface IChapterImageService {
    List<ChapterImageDTO>getImagesByChapter(String chapterId);

}
