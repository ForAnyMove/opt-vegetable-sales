import { CATALOG_LIST } from '../local-data/catalog-list.js';

const itemsByPage = 6;
let activePageNumber = 1;

function createCatalogContainer(itemsList) {
  const catalogContainer = document.getElementById('catalog-container');

  // Clear existing content
  catalogContainer.innerHTML = '';

  const subContainer = document.createElement('div');
  subContainer.className = 'row';
  catalogContainer.appendChild(subContainer);

  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'col-lg-12';
  subContainer.appendChild(columnsContainer);

  // * Create the options panel and items count
  const optionsPanel = document.createElement('div');
  optionsPanel.className = 'ltn__shop-options';
  columnsContainer.appendChild(optionsPanel);

  const optionsList = document.createElement('ul');
  columnsContainer.appendChild(optionsList);

  const itemsCountLi = document.createElement('li');
  optionsList.appendChild(itemsCountLi);

  const itemsCount = document.createElement('div');
  itemsCount.className = 'ltn__shop-options-count';
  itemsCountLi.appendChild(itemsCount);

  const itemsCountText = document.createElement('span');
  itemsCountText.textContent = `Showing 1–${Math.min(itemsByPage, itemsList.length)} of ${itemsList.length} results`;
  itemsCount.appendChild(itemsCountText);
  // * End of options panel and items count

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

  updateCatalogPage(itemsRow, itemsList, 1, itemsByPage, paginationList, itemsCountText); // Create the initial items list
  columnsContainer.appendChild(paginationContainer);
  // * End of items container
}

function recreatePaginationTab(itemsListContainer, itemsArray, pageNumber, itemsPerPage, paginationList, itemsCountText) {
  paginationList.innerHTML = '';
  const totalPages = Math.ceil(itemsArray.length / itemsByPage);

  const appendPage = (num) => {
    const pageItem = document.createElement('li');
    if (num === activePageNumber) pageItem.classList.add('active');
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.textContent = num;
    pageLink.addEventListener('click', (event) => {
      event.preventDefault();
      activePageNumber = num;
      updateCatalogPage(itemsListContainer, itemsArray, activePageNumber, itemsPerPage, paginationList, itemsCountText);
    });
    pageItem.appendChild(pageLink);
    paginationList.appendChild(pageItem);
  };
  
  const appendDots = (isForward) => {
    const dotsItem = document.createElement('li');
    const dotsLink = document.createElement('a');
    dotsLink.href = '#';
    dotsLink.textContent = '...';
    dotsLink.addEventListener('click', (event) => {
      event.preventDefault();
      updateCatalogPage(itemsListContainer, itemsArray, isForward ? activePageNumber + 2 : activePageNumber - 2, itemsPerPage, paginationList, itemsCountText);
    });
    dotsItem.appendChild(dotsLink);
    paginationList.appendChild(dotsItem);
  };
  
  const prevPageBtn = document.createElement('li');
  paginationList.appendChild(prevPageBtn);

  const prevPageLink = document.createElement('a');
  prevPageLink.href = '#';
  prevPageBtn.appendChild(prevPageLink);

  const prevPageIcon = document.createElement('i');
  prevPageIcon.className = 'fas fa-angle-double-left';
  prevPageLink.appendChild(prevPageIcon);

  prevPageLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (activePageNumber > 1) {
      activePageNumber--;
      updateCatalogPage(itemsListContainer, itemsArray, activePageNumber, itemsPerPage, paginationList, itemsCountText); // Recreate the catalog items list to update the view
    }
  });

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      appendPage(i);
    }
  } else {
    const nearStart = activePageNumber <= 2;
    const nearEnd = activePageNumber >= totalPages - 1;

    if (nearStart) {
      appendPage(1);
      appendPage(2);
      appendPage(3);
      appendDots(true);
      appendPage(totalPages);
    } else if (nearEnd) {
      appendPage(1);
      appendDots(false);
      appendPage(totalPages - 2);
      appendPage(totalPages - 1);
      appendPage(totalPages);
    } else {
      appendPage(1);
      appendDots(false);
      appendPage(activePageNumber - 1);
      appendPage(activePageNumber);
      appendPage(activePageNumber + 1);
      appendDots(true);
      appendPage(totalPages);
    }
  }
  
  const nextPageBtn = document.createElement('li');
  paginationList.appendChild(nextPageBtn);

  const nextPageLink = document.createElement('a');
  nextPageLink.href = '#';
  nextPageBtn.appendChild(nextPageLink);

  const nextPageIcon = document.createElement('i');
  nextPageIcon.className = 'fas fa-angle-double-right';
  nextPageLink.appendChild(nextPageIcon);
  
  nextPageLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (activePageNumber < Math.ceil(itemsArray.length / itemsByPage)) {
      activePageNumber++;
      updateCatalogPage(itemsListContainer, itemsArray, activePageNumber, itemsPerPage, paginationList, itemsCountText); // Recreate the catalog items list to update the view
    }
  });
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

function updateCatalogPage (itemsListContainer, itemsArray, pageNumber, itemsPerPage, paginationList, itemsCountText) {
  const itemsList = itemsArray || [];
  activePageNumber = pageNumber || 1;

  const startIndex = (activePageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  itemsCountText.textContent = `Showing ${startIndex + 1}–${Math.min(endIndex, itemsList.length)} of ${itemsList.length} results`;
  recreateItemsContainer(itemsList.slice(startIndex, endIndex), itemsListContainer);
  recreatePaginationTab(itemsListContainer, itemsArray, pageNumber, itemsPerPage, paginationList, itemsCountText);
};

document.addEventListener('DOMContentLoaded', () => {
  createCatalogContainer(CATALOG_LIST);
});