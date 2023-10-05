package com.example.backend.Util;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImageController {

    @PostMapping(value = "/api/images/upload")
    public String uploadImage(@RequestParam("image") MultipartFile image) {
        return "Hello World";
//        if (image.isEmpty()) {
//            return "Please select a file to upload.";
//        }
//
//        try {
//            byte[] bytes = image.getBytes();
//            String uploadPath = "../../resources/static"; // Specify your project folder path
//            Path path = Paths.get(uploadPath + File.separator + image.getOriginalFilename());
//            Files.write(path, bytes);
//            return "Image uploaded successfully!";
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "Image upload failed.";
//        }
    }
}