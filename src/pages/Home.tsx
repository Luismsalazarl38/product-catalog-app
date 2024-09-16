import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './Home.css'; // Asegúrate de tener el archivo CSS actualizado

const Home: React.FC = () => {
  const history = useHistory();
  const { wishlist } = useWishlist();
  
  // Obtener el primer producto de la lista de wishlist
  const featuredProduct = Object.values(wishlist)[0];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Our App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid className="home-grid">
          <IonRow>
            {/* Featured Product Section */}
            {featuredProduct && (
              <IonCol size="12" sizeMd="6" sizeLg="6">
                <IonCard className="featured-card">
                  {/* Mostrar la primera imagen del producto */}
                  <IonImg src={featuredProduct.images[0]} alt={featuredProduct.title} className="featured-card-img"/>
                  <IonCardHeader>
                    <IonCardTitle>{featuredProduct.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{featuredProduct.description}</p>
                    <IonButton expand="full" color="dark" onClick={() => history.push('/products')}>
                      See More Products
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )}

            {/* Call to Action Section */}
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonCard className="cta-card">
                <IonCardContent>
                  <h2>Explore Our Catalog</h2>
                  <p>Browse through our full product catalog to find more amazing products like this one.</p>
                  <IonButton expand="full" color="dark" onClick={() => history.push('/products')}>
                    Explore Products
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
