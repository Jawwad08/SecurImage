import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAdvsignup } from "../hook/useAdvsignup";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SignImageGallery3 = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { asignup, error, isLoading } = useAdvsignup();

  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch images from the server
    document.body.style.textAlign='center';
    axios.get('http://localhost:5000')
      .then(response => setImages(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleImageClick = (index, image) => {
    // Set the selected image index and image
    setSelectedImageIndex(index);
    setSelectedImage(image);
  };

  const handleCategoryChange = (category) => {
    // Set the selected category and reset selected image
    setSelectedCategory(category);
    setSelectedImage(null);
  };

  const handleClick = async () => {
    try {
      await asignup(
        location.state.email,
        location.state.password,
        location.state.category1,
        location.state.image1,
        location.state.category2,
        location.state.image2,
        selectedCategory,
        selectedImage
      );
    } catch (error) {
      console.error('Error while signing up:', error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center">Image Gallery</h1>
        <div>
          <label>Select a category:</label>
          <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory || ''}>
            <option value="">All</option>
            {/* Assuming categories are available in your images data */}
            {[...new Set(images.map(img => img.category))].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {/* Render images only when a category is selected */}
        {selectedCategory && (
          <div className="row" style={{ textAlign: 'center' }}>
            {images.filter(img => img.category === selectedCategory).map((singleData, index) => {
              const base64String = btoa(
                String.fromCharCode(...new Uint8Array(singleData.img.data.data))
              );
              return (
                <div className="col-md-4 mb-4" key={index} style={{ display: 'inline-block', width: '33%', marginBottom: '16px', marginTop: '16px' }}>
                  <label className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      checked={index === selectedImageIndex}
                      onChange={() => handleImageClick(index, base64String)}
                    />
                    <img
                      src={`data:image/jpg;base64,${base64String}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                      className="img-thumbnail"
                      onClick={() => handleImageClick(index, base64String)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Display the selected image */}
      {selectedImage && (
        <div className="container mt-4">
          <h2 className="text-center">Selected Image</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4" style={{ height: '300px' }}>
              <label className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                />
                <img
                  src={`data:image/jpg;base64,${selectedImage}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="img-fluid rounded"
                />
              </label>
            </div>
          </div>
        </div>
      )}
      <button disabled={!selectedImage || !selectedCategory} onClick={handleClick}>Ok</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SignImageGallery3;
