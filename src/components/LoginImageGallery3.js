import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {useAdvlogin}   from '../hook/useAdvlogin'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LoginImageGallery3 = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate(); 
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const {alogin, error, isLoading, setError} = useAdvlogin()
  useEffect(() => {
    // Fetch images from the server
    document.body.style.textAlign='center'
    axios.get('http://localhost:5000')
      .then(response => setImages(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleImageClick = (index, image) => {
    // Set the selected image index
    setSelectedImageIndex(index);
    setSelectedImage(image);
  };

  const handleCategoryChange = (category) => {
    // Set the selected category and filter images based on the category
    console.log(category)
    setSelectedCategory(category);
    setSelectedImage(null); // Clear selected image when changing the category
  };
  const fixedImageWidth = '350px'; // Set the desired width for the images
  const fixedImageHeight = '210px'; 
  const filteredImages = selectedCategory
    ? images.filter(img => img.category === selectedCategory)
    : images;
    const handleClick = async (e) => {
        e.preventDefault()
        console.log("Selected Category:", selectedCategory);
        console.log("Selected Image:", selectedImage);
        console.log("All Images:", images);
        if (!selectedCategory || !selectedImage) {
          setError('Please select a category and an image.');
          return;
        }
      
       
            await alogin(
              location.state.email,
              location.state.password,
              location.state.category1,
              location.state.image1,
              location.state.category2,
              location.state.image2,
              selectedCategory,
              selectedImage
            );
        };
  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center">Image Gallery</h1>
        <div>
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory || ''}>
            {/* Default option */}
            <option value="">--select--</option>
            {/* Assuming categories are available in your images data */}
            {[...new Set(images.map(img => img.category))].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="row" style={{ textAlign: 'center' }}>
          {filteredImages.map((singleData, index) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(singleData.img.data.data))
            );
            return (
              <div className="col-md-4 mb-4" key={index} style={{ display: 'inline-block', width: '33%', marginBottom: '16px' ,marginTop:'16px'}}>
                <label className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    checked={index === selectedImageIndex}
                    onChange={() => handleImageClick(index)}
                  />
                  <img
                    src={`data:image/jpg;base64,${base64String}`}
                    style={{ width: fixedImageWidth, height: fixedImageHeight, objectFit: 'cover', cursor: 'pointer' }}
                    className="img-thumbnail"
                    onClick={() => handleImageClick(index, base64String)}
                  />
                </label>
              </div>
            );
          })}
        </div>
        <button disabled={isLoading || !selectedImage || !selectedCategory} onClick={handleClick}>Ok</button>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default LoginImageGallery3;