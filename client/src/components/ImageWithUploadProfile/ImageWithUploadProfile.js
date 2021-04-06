import { useState, useEffect } from "react";
import axios from "axios";
import utils from "../../utils";
import "./ImageWithUploadProfile.scss";
import Loading from "../Loading/Loading";

function ImageWithUploadProfile({userId, initialImage = "placeholder.png"}) 
{
  // Use prop to initialize state.
  // This will get replaced on upload.
  const [imageSrc, setImageSrc] = useState(initialImage); 
  const [file, setFile] = useState(""); 
  const [filename, setFilename] = useState("Choose File"); 
  const [loading, setLoading] = useState(false); 

  const onFileSelect = e => {
    const file = e.target.files[0];

    // utils.verifyImageFile() will call alerts on error
    if (utils.verifyImageFile(file)) { 
      setFile(file);
      setFilename(file.name);
      return;
    }
    else {
      setFile("");
      setFilename("Choose File");
      return;
    }
  }

  const handleImageSubmit = e => {
    e.preventDefault();
    if (!file) return alert("You need to choose a file!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userUuid", userId);

    const url = process.env.REACT_APP_API_URL + "/upload/user";
    axios
      .post(url, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          ...utils.getAuthHeader()
        }
      })
      .then(res => {
        setImageSrc(res.data.fileName);
        setFilename("Success!");
        setLoading(false);
      })
      .catch(err => {
        if (err.response.status === 500) alert("There was a problem with the server.");
        else alert("An error occurred while trying to upload the file.");

        setLoading(false);
        console.error("ImageWithUploadProfile - handleImageSubmit():", err);
      })
  }

  // Force update of cached image in other components on unmount
  useEffect(() => {
    return () => {
      if (file) window.location.reload();
    }
    // eslint-disable-next-line
  }, [])

  return (  
    <div className="ImageWithUploadProfile">
      {loading ? <Loading /> :
        (<>
          <form className="ImageWithUploadProfile__form" onSubmit={handleImageSubmit}>
            <div className="ImageWithUploadProfile__fileInputContainer">
              <input type="file" className="ImageWithUploadProfile__inputFile" id="imageUpload" onChange={onFileSelect} />
              <label className="ImageWithUploadProfile__inputFileLabel" htmlFor="imageUpload">
                {filename}
              </label>
            </div>
            <input type="submit" value="Submit" className="ImageWithUploadProfile__submit" />
          </form>
          <img className="ImageWithUploadProfile__image" src={utils.getPublicUrl(imageSrc)} alt={imageSrc} />
        </>)}
    </div>
  )
}

export default ImageWithUploadProfile;