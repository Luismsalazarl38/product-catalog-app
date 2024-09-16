// src/pages/Categories.tsx
import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const Categories: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <h1>Categories</h1>
          <p>Explore our categories to find what you need.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
