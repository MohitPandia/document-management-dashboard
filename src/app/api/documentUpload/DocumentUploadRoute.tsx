import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default async function uploadDocument(formData: FormData) {
  const file = formData.get('file') as Blob;

  if (!file) {
    return { error: 'No file provided', status: 400 };
  }

  try {
    const id = uuidv4();
    // Creating a new FormData object to upload the file
    const uploadForm = new FormData();
    uploadForm.append('file', file);

    // Send the file to 0x0.st-
    const response = await axios.post('https://0x0.st', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'text'
    });
    // Extract the X-Token from the response headers
    const token = response.headers['x-token'];
    // The response will contain the file URL only
    const fileUrl = response.data.trim();

    const document = {
      id,
      name: (file as File).name,
      url: fileUrl,
      size: (file as File).size,
      uploadDate: new Date().toISOString(),
    };

    // Retrieve existing image data from localStorage
    let imageArray = JSON.parse(localStorage.getItem("image") || "[]");
    console.log("data: ", imageArray);

    // Append the new image data to the array
    imageArray.push(document);
    // Store the updated array back in localStorage
    localStorage.setItem("image", JSON.stringify(imageArray));

    return { success: true, document, status: 200 };
  } catch (error) {
    return { error: 'File upload failed', status: 500 };
  }
}
