import React from "react";


export const isImage = (file) => {
    var ftype = file.type;
    switch (ftype) {
        case 'image/png':
        case 'image/gif':
        case 'image/jpeg':
        case 'image/pjpeg':
            console.log("Acceptable image file!");
            return 1;
        default:
            console.log('Unsupported File!');
            return 0;
    }
}

export const isSizeExceeded = (file, sizeAllow = 1048576) => {
    var fsize = file.size;
    if (fsize > sizeAllow)
        return 1;
    else
        return 0;
}