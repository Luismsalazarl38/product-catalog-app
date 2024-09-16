import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonContent, IonPage, IonGrid } from '@ionic/react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';  // Importamos el efecto Coverflow

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';  // Importamos los estilos de Coverflow
import './Products.css';  // Importamos los estilos personalizados

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError('Unexpected data format');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  // Agrupar productos por categoría
  const groupProductsByCategory = () => {
    return products.reduce((acc: { [key: string]: Product[] }, product) => {
      const category = product.category?.name || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const categorizedProducts = groupProductsByCategory();

  return (
    <IonPage style={{padding:'15px'}}>
      <IonContent>
        <IonGrid>
          {Object.keys(categorizedProducts).map((category) => (
            <div key={category} className="category-container">              <h2 className="category-title">{category}</h2>
              <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}  // Agregamos el efecto Coverflow
                spaceBetween={10}
                slidesPerView={3}  // Ver más de un slide al mismo tiempo
                navigation
                pagination={{ clickable: true }}
                loop={true}
                centeredSlides={true}  // El producto central siempre será el enfocado
                effect="coverflow"  // Establecemos el efecto Coverflow
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
              >
                {categorizedProducts[category].map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Products;
