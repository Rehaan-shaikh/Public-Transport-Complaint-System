import cloudinary from "./cloudinery";

export async function uploadMedia(files) {
  const uploadedFiles = [];

  for (const file of files) {  //for multiple files
    if (file.size === 0) continue;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto", // auto = image/video
            folder: "complaints",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    uploadedFiles.push({
      url: uploadRes.secure_url,
      type: uploadRes.resource_type,
    });
  }

  return uploadedFiles;
}
