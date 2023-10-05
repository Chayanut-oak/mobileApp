package com.example.backend.Util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@RestController
public class ImageController {
    private final String uploadPath = System.getProperty("user.dir")+"/src/main/resources/image/";
    @PostMapping(value = "/images/upload")
    public String uploadImage(@RequestParam("image") MultipartFile image) {
        if (image.isEmpty()) {
            return "Please select a file to upload.";
        }
        try {
            byte[] bytes = image.getBytes();

//            System.out.println(uploadPath);
            Path path = Paths.get(uploadPath +  image.getOriginalFilename());
            Files.write(path, bytes);
            return "Image uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Image upload failed.";
        }
    }
    @GetMapping(value = "/images/get/{name}")
    public String getImageByName(@PathVariable String name){
        try {
            // Read the image file and return it as a byte array
            byte[] imageBytes = Files.readAllBytes(Paths.get(uploadPath + name));
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
            return base64Image;
        } catch (IOException e) {
            // Handle the exception if the image file is not found
            return "Failed";
        }
    }

}