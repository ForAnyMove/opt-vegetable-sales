export const CATALOG_LIST = [
  {
    id: 1,
    title: 'Red Hot Tomato',
    image: {
      src: 'img/product/1.png',
      alt: 'Red Hot Tomato'
    },
    price: 162,
    salePrice: 149,
    markers: {
      isNew: true,
      isHot: false,
      isSell: {
        status: false,
        sellSize: 25,
      }
    }
  },
  {
    id: 2,
    title: 'Vegetables Juices',
    image: {
      src: 'img/others/1.png',
      alt: 'Vegetables Juices'
    },
    price: 85,
    salePrice: 62,
    markers: {
      isNew: false,
      isHot: false,
      isSell: {
        status: false,
        sellSize: 25,
      }
    }
  },
  {
    id: 3,
    title: 'Orange Fresh Juice',
    image: {
      src: 'img/product/1.png',
      alt: 'Orange Fresh Juice'
    },
    price: 92,
    salePrice: 74,
    markers: {
      isNew: false,
      isHot: true,
      isSell: {
        status: false,
        sellSize: 25,
      }
    }
  },
  {
    id: 4,
    title: 'Fresh Butter Cake',
    image: {
      src: 'img/product/1.png',
      alt: 'Fresh Butter Cake'
    },
    price: 180,
    salePrice: 150,
    markers: {
      isNew: false,
      isHot: false,
      isSell: {
        status: true,
        sellSize: 25,
      }
    }
  },
]