<?php

    // Create a class to handle file uploads
    //  - There must be an option to return JSON after a successful upload,
    //    with some information about the file that was uploaded

    class FileUpload {
        private $file;
        private $fileName;
        private $fileType;
        private $fileSize;
        private $json = [];
        private $jsonResized = [];

        function __construct($newFile) {
            $this->file = $newFile;
            $this->fileName = basename($newFile["name"]);
            $this->fileType = strtolower(pathinfo($this->fileName, PATHINFO_EXTENSION));
            $this->fileSize = $this->file["size"];
        }

        public function GetFileName() {
            return $this->fileName;
        }

        public function GetFileType() {
            return $this->fileType;
        }

        public function GetFileSize() {
            return $this->fileSize;
        }

        public function RenameFile($newName) {
            $this->fileName = $newName . "." . $this->fileType;
        }

        public function UploadFile($targetFolder) {
            // Create folder if it does not exist
            $targetFolder = $this->CheckFolder($targetFolder);

            // Upload the file
            if(!move_uploaded_file($this->file["tmp_name"], $targetFolder . $this->fileName)) {
                return false;
            } else {
                $this->CreateJSON("success");
                return json_encode($this->json);
            }
        }

        public function ResizeAndUpload($targetFolder, $resizeDim) {
            // Requires the GD extension to be active in the php.ini file
            $targetFolder = $this->CheckFolder($targetFolder);

            //function ResizeImage($fileToResize, $resizeDim, $newFileName, $targetFolder) {
            $file = $this->file['tmp_name'];
            $fileTarget = $targetFolder . $this->fileName;

            // Get the dimensions of the image file and resize it, while keeping the original aspect ratio
            $fileDim = getimagesize($file);
            $width = $fileDim[0];
            $height = $fileDim[1];

            $ratio = $width / $height;

            if($ratio > 1) {
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
            imagecopyresampled($newImage, $originalImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height );

            // Create and save the new image as PNG on the computer, and return a bool if it was a success (true) or failed (false)
            $success = imagejpeg($newImage, $fileTarget);

            // Delete the two images
            imagedestroy($originalImage);
            imagedestroy($newImage);

            if($success) {
                $resize["folder"] = $targetFolder;
                $resize["width"] = floor($newWidth);
                $resize["height"] = floor($newHeight);
                $resize["size"] = filesize($fileTarget);
                $resize["name"] = $this->fileName;

                $this->jsonResized[] = $resize;
                return true;
            } else {
                return false;
            }
        }

        private function CreateJSON($success) {
            $this->json['status'] = $success;
            $this->json['name'] = $this->fileName;
            $this->json['type'] = $this->fileType;
            $this->json['size'] = $this->fileSize;
            if(count($this->jsonResized) > 0) {
                $this->json['resized'] = $this->jsonResized;
            }
        }

        private function CheckFolder($targetFolder) {
            // Check if the last character in the folder path is a '/', if not then add it to the end
            $lastCharacter = substr($targetFolder, -1);
            if($lastCharacter !== "/") {
                $targetFolder .= "/";
            }

            // Check if the folder already exists, otherwise create the folder
            if (!file_exists($targetFolder)) {
                mkdir($targetFolder, 0777, true);
            }

            return $targetFolder;
        }
    }

?>