import React from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonIcon, IonButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { heart, heartOutline } from 'ionicons/icons';
import { Product } from '../types/types';
import { useWishlist } from '../context/WishlistContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <IonCard className="product-card">
      <div className="wishlist-button-container">
        <IonButton 
          fill="clear" 
          className="wishlist-button"
          onClick={handleWishlistToggle}
        >
          <IonIcon 
            icon={isInWishlist(product.id) ? heart : heartOutline} 
            color={isInWishlist(product.id) ? "danger" : "medium"}
          />
        </IonButton>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`${product.title} - Image ${index + 1}`} className="product-card-image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <IonCardContent className="product-card-content">
        <IonCardTitle className="product-card-title">{product.title}</IonCardTitle>
        <p className="product-card-price">${product.price}</p>
        <p className="product-card-description">{product.description}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;