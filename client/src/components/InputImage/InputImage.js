import "./InputImage.scss";

function InputImage({onFileSelect, imageSrc, filename}) 
{
  return (  
    <div className="InputImage">
      <div className="InputImage__form">
        <div className="InputImage__fileInputContainer">
          <input type="file" className="InputImage__inputFile" id="imageUpload" onChange={onFileSelect} />
          <label className="InputImage__inputFileLabel" htmlFor="imageUpload">
            {filename}
          </label>
        </div>
      </div>
      <img className="InputImage__image" src={imageSrc} alt={filename} />
    </div>
  )
}

export default InputImage;