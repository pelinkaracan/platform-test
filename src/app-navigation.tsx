export const navigation = [
  {
    text: 'Anasayfa',
    path: '/dashboard',
    icon: 'home'
  },
  {
    text: 'Siparişler',
    icon: 'cart',
    items: [
      {
        text: 'Sipariş Listesi',
        path: '/orderList'
      }
    ]
  },
  {
    text: 'Raporlar',
    icon: 'filter',
    items: [
      {
        text: 'Tamamlanan Siparişler',
        path: '/completedOrder'
      }
    ]
  },
  {
    text: 'Sistem',
    icon: 'preferences',
    items: [
      {
        text: 'Hesaplar',
        path: '/page1'
      },
      {
        text: 'Üyelikler',
        path: '/page2'
      },
      {
        text: 'Kullanıcılar',
        path: '/page3'
      },
      {
        text: 'Tedarikçiler',
        path: '/page4'
      }
    ]
  }
  ];
