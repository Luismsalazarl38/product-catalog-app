import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonBadge } from '@ionic/react';
import { menuOutline, homeOutline, listOutline, gridOutline, heartOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  const history = useHistory();
  const { wishlist } = useWishlist();

  // Convert wishlist object to an array and get the length
  const wishlistCount = Object.keys(wishlist).length;

  return (
    <IonHeader>
      <IonToolbar>
        {onMenuClick && (
          <IonButtons slot="start">
            <IonButton onClick={onMenuClick}>
              <IonIcon icon={menuOutline} />
            </IonButton>
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => history.push('/home')}>
            <IonIcon icon={homeOutline} />
          </IonButton>
          <IonButton onClick={() => history.push('/products')}>
            <IonIcon icon={listOutline} />
          </IonButton>
          <IonButton onClick={() => history.push('/wishlist')}>
            <IonIcon icon={heartOutline} />
            {wishlistCount > 0 && (
              <IonBadge color="danger">{wishlistCount}</IonBadge>
            )}
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
