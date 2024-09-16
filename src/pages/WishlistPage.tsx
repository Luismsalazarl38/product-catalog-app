import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, SelectChangeEventDetail } from '@ionic/react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';
import './WishlistPage.css'; // Importa el archivo CSS para estilos personalizados

type SortOption = 'name' | 'price' | 'dateAdded';

const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();
  const [sortOption, setSortOption] = useState<SortOption>('dateAdded');

  // Convert wishlist object to array and sort
  const sortedWishlist = Object.values(wishlist).sort((a: Product, b: Product) => {
    switch (sortOption) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'price':
        return a.price - b.price;
      case 'dateAdded':
      default:
        return 0; // Maintain original order
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Wishlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSelect
                value={sortOption}
                onIonChange={(e: CustomEvent<SelectChangeEventDetail<SortOption>>) => setSortOption(e.detail.value!)}
                interface="popover"
                className="custom-select"
              >
                <IonSelectOption value="name">Sort by Name</IonSelectOption>
                <IonSelectOption value="price">Sort by Price</IonSelectOption>
                <IonSelectOption value="dateAdded">Sort by Date Added</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow>
            {sortedWishlist.map(product => (
              <IonCol size="12" sizeSm="6" sizeMd="4" sizeLg="3" key={product.id}>
                <ProductCard product={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WishlistPage;
