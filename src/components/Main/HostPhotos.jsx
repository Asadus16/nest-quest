import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHostProgress } from "../../redux/AppSlice";
import nestLogo from "../../asset/nestLogo.svg";
import MobileFooter from "../Footer/MobileFooter";
import SegmentedProgressBar from "../Common/SegmentedProgressBar";

// Three dots loader component
const ThreeDotsLoader = ({ color = "white" }) => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div
        className={`w-2 h-2 rounded-full`}
        style={{
          backgroundColor: color,
          animation: "bounce 1.4s infinite",
          animationDelay: "0s",
        }}
      ></div>
      <div
        className={`w-2 h-2 rounded-full`}
        style={{
          backgroundColor: color,
          animation: "bounce 1.4s infinite",
          animationDelay: "0.2s",
        }}
      ></div>
      <div
        className={`w-2 h-2 rounded-full`}
        style={{
          backgroundColor: color,
          animation: "bounce 1.4s infinite",
          animationDelay: "0.4s",
        }}
      ></div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

const HostPhotos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState([]);

  // Step 2 - Second segment: ~50% (33 + 17%)
  useEffect(() => {
    dispatch(setHostProgress(50));
  }, [dispatch]);

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate("/host/amenities");
    }, 500);
  };

  const handleNext = () => {
    if (photos.length >= 5) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/host/title");
      }, 500);
    }
  };

  const handleSaveAndExit = () => {
    navigate("/");
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
    }));
    setUploadingPhotos((prev) => [...prev, ...newPhotos]);
    if (!showUploadModal) {
      setShowUploadModal(true);
    }
  };

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo?.preview) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) {
      const newPhotos = files.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        uploading: false,
      }));
      setUploadingPhotos((prev) => [...prev, ...newPhotos]);
      if (!showUploadModal) {
        setShowUploadModal(true);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="w-full border-b border-gray-200">
        <div className="w-full mx-auto px-6 1xz:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img src={nestLogo} alt="Nest Quest" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAndExit}
              className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors text-sm 1xz:text-base"
            >
              Questions?
            </button>
            <button
              onClick={handleSaveAndExit}
              className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-900 font-semibold hover:border-gray-400 transition-colors text-sm 1xz:text-base"
            >
              Save & exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {photos.length === 0 ? (
        /* Initial State - Camera Icon and Add Photos Button */
        <div className="w-full max-w-4xl mx-auto px-6 1xz:px-8 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
          <h1 className="text-3xl 1xz:text-4xl font-semibold text-gray-900 mb-3 text-center">
            Add some photos of your house
          </h1>
          <p className="text-base text-gray-600 mb-8 text-center">
            You'll need 5 photos to get started. You can add more or make changes later.
          </p>

          {/* Upload Area - Large Gray Box with Camera Illustration */}
          <div className="w-full max-w-2xl">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => setShowUploadModal(true)}
            >
              {/* Isometric Camera Illustration */}
              <div className="mb-6">
                <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                  {/* Camera Body - Silver */}
                  <rect x="20" y="40" width="80" height="50" rx="5" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="2"/>
                  {/* Camera Lens - Black */}
                  <circle cx="60" cy="65" r="15" fill="#1F2937" stroke="#000" strokeWidth="2"/>
                  {/* Camera Lens Inner */}
                  <circle cx="60" cy="65" r="8" fill="#374151"/>
                  {/* Camera Strap - Brown */}
                  <path d="M 20 45 Q 10 50 10 60 Q 10 70 20 75" stroke="#8B4513" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  <path d="M 100 45 Q 110 50 110 60 Q 110 70 100 75" stroke="#8B4513" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  {/* Camera Top */}
                  <rect x="30" y="35" width="60" height="8" rx="3" fill="#D1D5DB"/>
                  {/* Flash */}
                  <circle cx="75" cy="50" r="3" fill="#FEF3C7"/>
                </svg>
              </div>
              {/* Add Photos Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUploadModal(true);
                }}
                className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium hover:bg-gray-50 transition-colors"
              >
                Add photos
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Photo Grid Layout */
        <div className="w-full max-w-6xl mx-auto px-6 1xz:px-8 py-12">
          {/* Title and Add Button Row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Choose at least 5 photos</p>
              <p className="text-xs text-gray-500">Drag to reorder</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Cover Photo - Large */}
          {photos[0] && (
            <div className="mb-6">
              <div className="relative group w-full rounded-lg overflow-hidden">
                <div className="absolute top-3 left-3 bg-gray-700 bg-opacity-80 px-2 py-1 rounded text-xs font-medium text-white z-10">
                  Cover Photo
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-90 flex items-center justify-center cursor-pointer hover:bg-opacity-100 z-10 shadow-sm">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </div>
                <img
                  src={photos[0].preview}
                  alt="Cover"
                  className="w-full" style={{ height: '300px'}}
                />
                <button
                  onClick={() => handleRemovePhoto(photos[0].id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Placeholder Photos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.slice(1, 5).map((photo, index) => (
              <div key={photo.id} className="aspect-square relative group">
                <img
                  src={photo.preview}
                  alt={`Photo ${index + 2}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemovePhoto(photo.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {/* Placeholder Boxes */}
            {Array.from({ length: Math.max(0, 4 - (photos.length - 1)) }).map((_, index) => (
              <button
                key={`placeholder-${index}`}
                onClick={() => setShowUploadModal(true)}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors bg-gray-50"
              >
                {/* Mountain and Sun Icon */}
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  <circle cx="18" cy="6" r="2" fill="currentColor" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        id="photo-upload"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[2000] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadingPhotos([]);
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Upload photos</h3>
                  <p className="text-sm text-gray-500">
                    {uploadingPhotos.length > 0 
                      ? `${uploadingPhotos.length} item${uploadingPhotos.length !== 1 ? "s" : ""} selected`
                      : "No items selected"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => document.getElementById("photo-upload").click()}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {uploadingPhotos.length > 0 ? (
                /* Show selected photos in modal */
                <div className="grid grid-cols-2 gap-4">
                  {uploadingPhotos.map((photo) => (
                    <div key={photo.id} className="relative aspect-square">
                      <img
                        src={photo.preview}
                        alt="Selected"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          setUploadingPhotos((prev) => {
                            const updated = prev.filter((p) => p.id !== photo.id);
                            URL.revokeObjectURL(photo.preview);
                            return updated;
                          });
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 z-10"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* Drag and Drop Area */
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById("photo-upload").click()}
                >
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-base font-medium text-gray-700 mb-1">Drag and drop</p>
                  <p className="text-sm text-gray-500 mb-4">or browse for photos</p>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Browse
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadingPhotos([]);
                }}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (uploadingPhotos.length > 0) {
                    // Add photos to main list
                    setPhotos((prev) => [...prev, ...uploadingPhotos]);
                    setUploadingPhotos([]);
                    setShowUploadModal(false);
                  }
                }}
                disabled={uploadingPhotos.length === 0}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  uploadingPhotos.length > 0
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Progress Bar, Back and Next */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Segmented Progress Bar */}
        <SegmentedProgressBar />

        {/* Navigation */}
        <div className="py-4 px-6">
          <div className="w-full mx-auto flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isBackLoading || isLoading}
              className="text-gray-700 hover:text-black font-medium transition-colors underline disabled:opacity-70 disabled:cursor-not-allowed min-w-[60px] flex items-center justify-center"
            >
              {isBackLoading ? <ThreeDotsLoader color="#374151" /> : "Back"}
            </button>
            <button
              onClick={handleNext}
              disabled={photos.length < 5 || isLoading || isBackLoading}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors min-w-[80px] flex items-center justify-center
                ${
                  photos.length >= 5 && !isLoading && !isBackLoading
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              {isLoading ? <ThreeDotsLoader /> : "Next"}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed footer */}
      <div className="h-24"></div>

      {/* Mobile Footer */}
      <div className="w-full 1xz:hidden">
        <MobileFooter />
      </div>
    </div>
  );
};

export default HostPhotos;
