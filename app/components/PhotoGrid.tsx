interface Photo {
  src: string;
  title?: string;
  date?: string;
  description?: string;
}

interface PhotoGridProps {
  photos: Photo[];
  title?: string;
}

const PhotoGrid = ({ photos, title }: PhotoGridProps) => {
  return (
    <section className="py-20">
      <div className="container">
        {title && (
          <h2 className="section-title">{title}</h2>
        )}
        
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <div key={index} className="photo-item">
              <img src={photo.src} alt={photo.title || ''} />
              {(photo.title || photo.date || photo.description) && (
                <div className="overlay-text">
                  {photo.title && (
                    <h3 className="text-2xl mb-2">{photo.title}</h3>
                  )}
                  {photo.description && (
                    <p className="text-gray-300 mb-3">{photo.description}</p>
                  )}
                  {photo.date && (
                    <span className="date-stamp">{photo.date}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGrid; 