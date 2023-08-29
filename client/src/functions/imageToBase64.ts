/* import Compressor from 'compressorjs' */

const imageRoBase64 = (file: File | Blob) => {
    return new Promise(resolve => {
        /* new Compressor(file, {
            quality: 1,
            success: (compressedResult) => {
                var reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result)
                }
                reader.readAsDataURL(compressedResult);
            }
        }) */
        
    })
}

export default imageRoBase64