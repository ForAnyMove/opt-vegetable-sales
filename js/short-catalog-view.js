import { CATALOG_LIST } from '../local-data/catalog-list.js';

const itemsByPage = 4;
let activePageNumber = 1;

function createCatalogContainer(itemsList) {
  const catalogContainer = document.getElementById('short-catalog');

  // Clear existing content
  catalogContainer.innerHTML = '';

  const subContainer = document.createElement('div');
  subContainer.className = 'row';
  catalogContainer.appendChild(subContainer);

  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'col-lg-12';
  subContainer.appendChild(columnsContainer);

  // * Create the pagination
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'ltn__pagination-area text-center';

  const paginationSubContainer = document.createElement('div');
  paginationSubContainer.className = 'ltn__pagination';
  paginationContainer.appendChild(paginationSubContainer);

  const paginationList = document.createElement('ul');
  paginationSubContainer.appendChild(paginationList);
  // * End of pagination

  // * Create the items container
  const itemsTab = document.createElement('div');
  itemsTab.className = 'tab-content';
  columnsContainer.appendChild(itemsTab);

  const itemsTabPane = document.createElement('div');
  itemsTabPane.className = 'tab-pane fade show active';
  itemsTabPane.id = 'liton_product_grid';
  itemsTab.appendChild(itemsTabPane);

  const itemsTabContent = document.createElement('div');
  itemsTabContent.className = 'ltn__product-tab-content-inner ltn__product-grid-view';
  itemsTabPane.appendChild(itemsTabContent);

  const itemsRow = document.createElement('div');
  itemsRow.className = 'row';
  itemsTabContent.appendChild(itemsRow);

  updateCatalogPage(itemsRow, itemsList, 1, itemsByPage, paginationList); // Create the initial items list
  columnsContainer.appendChild(paginationContainer);
  // * End of items container
}

function recreateItemsContainer(itemsList, itemsContainer) {
  itemsContainer.innerHTML = ''; // Clear existing items

  itemsList.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'col-xl-3 col-lg-4 col-sm-6 col-6';
    itemsContainer.appendChild(itemDiv);

    const productItem = document.createElement('div');
    productItem.className = 'ltn__product-item ltn__product-item-3 text-center';
    itemDiv.appendChild(productItem);
    productItem.style.border = '2px solid #dedede';

    const productImage = document.createElement('div');
    productImage.className = 'product-img';
    productItem.appendChild(productImage);

    const imageLinkMock = document.createElement('a');
    imageLinkMock.href = '#';
    imageLinkMock.addEventListener('click', (event) => {
      event.preventDefault();
    });
    productImage.appendChild(imageLinkMock);

    const img = document.createElement('img');
    img.style.aspectRatio = '1/1';
    img.style.objectFit = 'cover';
    img.src = item.image.src;
    img.alt = item.image.alt;
    img.style.zIndex = '0';
    imageLinkMock.appendChild(img);
    
    const productBadge = document.createElement('div');
    productBadge.className = 'product-badge';
    productImage.appendChild(productBadge);

    const badgesList = document.createElement('ul');
    productBadge.appendChild(badgesList);

    if (item.markers.isNew) {
      const newBadge = document.createElement('li');
      newBadge.className = 'sale-badge';
      newBadge.textContent = 'New';
      badgesList.appendChild(newBadge);
    }
    if (item.markers.isHot) {
      const hotBadge = document.createElement('li');
      hotBadge.className = 'hot-badge';
      hotBadge.textContent = 'Hot';
      badgesList.appendChild(hotBadge);
    }
    if (item.markers.isSell.status) {
      const sellBadge = document.createElement('li');
      sellBadge.className = 'sell-badge';
      sellBadge.textContent = `Sell -${item.markers.isSell.sellSize}%`;
      badgesList.appendChild(sellBadge);
    }

    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    productItem.appendChild(productInfo);

    const productTitle = document.createElement('h2');
    productTitle.className = 'product-title';
    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = item.title;
    titleLink.addEventListener('click', (event) => {
      event.preventDefault();
    });
    productTitle.appendChild(titleLink);
    productInfo.appendChild(productTitle);

    const productPrice = document.createElement('div');
    productPrice.className = 'product-price';
    productPrice.style.marginBottom = '0';
    productInfo.appendChild(productPrice);

    if (item.salePrice) {
      const salePriceSpan = document.createElement('span');
      salePriceSpan.className = 'new-price';
      salePriceSpan.textContent = `$${parseInt(item.salePrice).toFixed(2)}`;
      productPrice.appendChild(salePriceSpan);
      
      const priceSpan = document.createElement('del');
      priceSpan.textContent = `$${parseInt(item.price).toFixed(2)}`;
      productPrice.appendChild(priceSpan);
    } else {
      const priceSpan = document.createElement('span');
      priceSpan.textContent = `$${parseInt(item.price).toFixed(2)}`;
      productPrice.appendChild(priceSpan);
    }
  });

  return itemsContainer;
}

function updateCatalogPage (itemsListContainer, itemsArray, pageNumber, itemsPerPage) {
  const itemsList = itemsArray || [];
  activePageNumber = pageNumber || 1;

  // Копируем массив, чтобы не изменять исходный
  const shuffled = itemsList.slice();
  // Перемешиваем массив с помощью алгоритма Фишера-Йетса
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  recreateItemsContainer(shuffled.slice(0, itemsByPage), itemsListContainer);
};

document.addEventListener('DOMContentLoaded', () => {
  createCatalogContainer(CATALOG_LIST);
});