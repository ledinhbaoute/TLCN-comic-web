package vn.hcmute.tlcn.service;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface IStorageService {
    public String storeFile(MultipartFile multipartFile);
    public Stream<Path>loadAll();

    public void deleteFile(String fileName);
    public byte[] readFileContent(String fileName);
}
