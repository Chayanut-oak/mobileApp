package com.example.backend.Util;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImageController {
    @PostMapping(value = "/images/upload")
    public String uploadImage(@RequestParam("image") MultipartFile image) {
        if (image.isEmpty()) {
            return "Please select a file to upload.";
        }
        try {
            byte[] bytes = image.getBytes();
            String uploadPath = System.getProperty("user.dir")+"/src/main/resources/image/";
//            System.out.println(uploadPath);
            Path path = Paths.get(uploadPath +  image.getOriginalFilename());
            Files.write(path, bytes);
            return "Image uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Image upload failed.";
        }
    }
}