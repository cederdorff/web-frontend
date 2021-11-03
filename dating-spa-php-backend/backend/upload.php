<?php
if (isset($_FILES["fileToUpload"])) {

    // Variables that can be changed
    $targetFolder = "original/";
    $allowedFileTypes = ["pdf", "txt"];
    $allowedImageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
    $allowedMaxFileSize = 1024 * 1024 * 5; // Bytes * KiloBytes * MegaBytes
    $addStringToFilename = true; // Adds $stringToAdd to the beginning of the original file name
    $replaceEntireFilename = false; // Replace the entire file name with $stringToAdd
    $stringToAdd = date("Ymd_His_"); // Adds the following datetime format as string: YYYYMMDD_HHMMSS_ (e.g. 20210830_215407_)
    $redirectPath = ""; // E.g. (index.php) - Leave blank if it should not redirect to any path
    $outputAsJSON = true; // Will echo/return the fileData as JSON (redirectPath must be blank!)

    // Used to create a JSON response
    $output = [];
    $fileData = [];

    // Used for controlling the logic in this script
    $file = $_FILES["fileToUpload"];
    $fileData["fileName"] = $addStringToFilename ? $stringToAdd . basename($file["name"]) : basename($file["name"]);
    $fileData["size"] = $file["size"];
    $targetFile = $targetFolder . $fileData["fileName"];
    $fileData["type"] = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $fileData["isImage"] = false;
    $fileAllowed = false;

    if ($replaceEntireFilename) {
        $fileData["fileName"] = $stringToAdd . "." . $fileData["type"];
    }

    // Check if a folder already exists, if not then create the folder
    if (!file_exists($targetFolder)) {
        mkdir($targetFolder, 0777, true);
    }

    // Check if a file with the same name already exists
    if (!file_exists($targetFile)) {
        $fileAllowed = true;
        $output["status"] = "success";
        $output["errorCode"] = "";
    } else {
        $output["status"] = "error";
        $output["errorCode"] = "Filename already exists";
    }

    if ($fileAllowed) {
        // Check if the file is an accepted FILE (non-image)
        // (Defined at line 6)
        foreach ($allowedFileTypes as $ext) {
            if ($ext == $fileData["type"]) {
                $fileAllowed = true;
                $output["status"] = "success";
                $output["errorCode"] = "";
                break;
            } else {
                $fileAllowed = false;
                $output["status"] = "error";
                $output["errorCode"] = "File type not accepted";
            }
        }

        // Check if the file is an accepted IMAGE
        // (Defined at line 7)
        if (!$fileAllowed) {
            foreach ($allowedImageTypes as $ext) {
                if ($ext == $fileData["type"]) {
                    $fileAllowed = true;
                    $output["status"] = "success";
                    $output["errorCode"] = "";

                    $fileData["isImage"] = true;
                    $fileData["imageWidth"] = getimagesize($file["tmp_name"])[0];
                    $fileData["imageHeight"] = getimagesize($file["tmp_name"])[1];
                    break;
                } else {
                    $fileAllowed = false;
                    $output["status"] = "error";
                    $output["errorCode"] = "File type not accepted";
                }
            }
        }
    }

    // Check the file size is within the allowed file size limit
    // (Defined at line 8)
    if ($fileAllowed) {
        if ($fileData["size"] > $allowedMaxFileSize) {
            $fileAllowed = false;
            $output["status"] = "error";
            $output["errorCode"] = "File size is too big. Only " . round($allowedMaxFileSize / 1024 / 1023, 2) . "MB is allowed";
        }
    }

    // If all requirements has been fullfilled, then begin to resize and upload
    if ($output["status"] == "success") {

        // Resize image and upload to other folder
        if ($fileData["isImage"] == true) {
            // (Input File, Max resize dimension, New file name, Folder destination)
            // ResizeImage($file, 1400, $fileData["fileName"], "medium/");
            ResizeImage($file, 800, $fileData["fileName"], "small/");
        }

        // Upload the original file
        if (!move_uploaded_file($file["tmp_name"], $targetFolder . $fileData["fileName"])) { // move_uploaded_file() does the actual upload!
            $output["status"] = "error";
            $output["errorCode"] = "Something went wrong in the upload process";
        } else {
            // What to do if upload is a success
        }
    }

    // Add the fileData to the output and convert to JSON
    $output["data"] = $fileData;
    $json = json_encode($output);

    // Return data as JSON
    if ($redirectPath == "") {
        if ($outputAsJSON) {
            echo $json;
        }
    } else {
        header("location: $redirectPath");
    }
}


// Requires the GD extension to be active in the php.ini file
function ResizeImage($fileToResize, $resizeDim, $newFileName, $targetFolder)
{
    $file = $fileToResize['tmp_name'];
    $fileTarget = $targetFolder . $newFileName;

    // Check if a folder already exists, if not then create the folder
    if (!file_exists($targetFolder)) {
        mkdir($targetFolder, 0777, true);
    }

    // Get the dimensions of the image file and resize it, while keeping the original aspect ratio
    $fileDim = getimagesize($file);
    $width = $fileDim[0];
    $height = $fileDim[1];

    $ratio = $width / $height;

    if ($ratio > 1) {
        // Width is larger than height
        $newWidth = $resizeDim;
        $newHeight = $resizeDim / $ratio;
    } else {
        // Height is larger than width
        $newWidth = $resizeDim * $ratio;
        $newHeight = $resizeDim;
    }

    // Create a variable that stores the original image from the file that has been uploaded
    $originalImage = imagecreatefromstring(file_get_contents($file));

    // Create a variable that stores a new (blank) image with the dimensions of the scaled image
    $newImage = imagecreatetruecolor($newWidth, $newHeight);

    // Copy the original image to the new image, while rescaling it accordingly
    imagecopyresampled($newImage, $originalImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

    // Create and save the new image as PNG on the computer, and return a bool if it was a success (true) or failed (false)
    $success = imagepng($newImage, $fileTarget);

    // Delete the two images
    imagedestroy($originalImage);
    imagedestroy($newImage);
    return $success;
}
