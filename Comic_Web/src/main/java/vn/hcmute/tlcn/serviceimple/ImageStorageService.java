package vn.hcmute.tlcn.serviceimple;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.service.IStorageService;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class ImageStorageService implements IStorageService {
    private final Path storageFolder = Paths.get("uploads");
    @Autowired
    private Cloudinary cloudinary;

    //    public ImageStorageService(String path) {
//        if (!Files.exists(this.storageFolder)) {
//            try {
//                Files.createDirectories(storageFolder);
//
//            } catch (IOException exception) {
//                throw new RuntimeException("Cannot initialize storage", exception);
//            }
//        }
//    }
    public ImageStorageService() {
        if (!Files.exists(this.storageFolder)) {
            try {
                Files.createDirectories(storageFolder);
            } catch (IOException exception) {
                throw new RuntimeException("Cannot initialize storage", exception);
            }
        }
    }

    public boolean isImageFile(MultipartFile file) {
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        return Arrays.asList(new String[]{"png", "jpg", "jpeg", "bmp"}).contains(fileExtension.trim().toLowerCase());
    }

    @Override
    public String storeFile(MultipartFile multipartFile) {
        try {
            if (multipartFile.isEmpty())
                throw new RuntimeException("Failed to store empty file.");
            if (!isImageFile(multipartFile))
                throw new RuntimeException("You can only upload image file.");
            float fileSizeInMegabytes = multipartFile.getSize() / 1000000.0f;
            if (fileSizeInMegabytes > 3.0f) {
                throw new RuntimeException("File must be <= 3Mb");
            }
            String fileExtension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
            String generatedFileName = UUID.randomUUID().toString().replace("-", "");
            generatedFileName = generatedFileName + "." + fileExtension;
            Path destinationFilePath = this.storageFolder.resolve(Paths.get(generatedFileName)).normalize()
                    .toAbsolutePath();
            if (!destinationFilePath.getParent().equals(this.storageFolder.toAbsolutePath())) {
                throw new RuntimeException("Cannot store file outside current directory.");
            }
            try (InputStream inputStream = multipartFile.getInputStream()) {
                Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
            }
            return generatedFileName;
        } catch (IOException exception) {
            throw new RuntimeException("Failed to store file", exception);
        }
    }
    public String storeToCloudinary(MultipartFile file) throws IOException {
        Map r=cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type","auto"));
        String img=r.get("secure_url").toString();
        return img;
    }

    @Override
    public byte[] readFileContent(String fileName) {
        try {
            Path file = storageFolder.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
                return bytes;
            } else {
                throw new RuntimeException("Could not read file:" + fileName);
            }
        } catch (IOException exception) {
            throw new RuntimeException("Could not read file:" + fileName, exception);
        }
    }

    @Override
    public Stream<Path> loadAll() {

        try {
            //list all files in storageFolder

            return Files.walk(this.storageFolder, 1)
                    .filter(path -> !path.equals(this.storageFolder))
                    .map(this.storageFolder::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load stored files", e);
        }
    }
    @Override
    public void deleteFile(String fileName) {
         String filePath= this.storageFolder.resolve(fileName).toString();
         String path=filePath.replace("\\","/");
         System.out.println(path);
        try{
            FileUtils.forceDelete(new File(path));
            System.out.println("File deleted successfully.");
        } catch (IOException e) {
            throw new RuntimeException("Cannot delete file",e);
        }

    }
}
