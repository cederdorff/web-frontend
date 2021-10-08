<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Get started with HTML, CSS and JavaScript">
    <meta name="author" content="Rasmus Cederdorff">
    <title>WEB-FRONTEND</title>
    <style>
    * {
        line-height: 1.5;
        margin: 0;
    }

    html {
        color: #333;
        display: table;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        height: 100%;
        text-align: center;
        width: 100%;
    }

    h1 {
        font-size: 2em;
        font-weight: 400;
        letter-spacing: 3px;
        margin: 1em 0;
        text-transform: uppercase;
    }

    h3 {
        font-size: 2em;
        font-weight: 400;
        letter-spacing: 3px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 1em 0;
    }

    a {
        letter-spacing: 1px;
        text-decoration: none;
        color: rgb(38, 76, 89);
    }

    a:hover {
        opacity: 0.6;
    }
    </style>
</head>

<body>
    <header>
        <h1 id="title">WEB FRONTEND</h1>
    </header>
    <h3>Projects</h3>
    <ul>
        <?php
        //Get a list of file paths in current directory.
        $fileList = glob('*');
        //Loop through the array that glob returned.
        foreach($fileList as $filename){
            if($filename !== "index.php"){
                echo "<li><a href='/$filename/'>$filename</a></li>";
            }
        }
        ?>
    </ul>
</body>

</html>