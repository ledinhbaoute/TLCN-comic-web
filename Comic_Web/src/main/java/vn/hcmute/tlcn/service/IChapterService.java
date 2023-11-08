package vn.hcmute.tlcn.service;

import vn.hcmute.tlcn.model.ChapterDTO;

import java.util.List;

public interface IChapterService {
    List<ChapterDTO> getChapterByComic(String comicId);

}
