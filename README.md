# ​E-commerce Store with Advanced Filtering  
## [Website Live Link](https://e-coomerce-kappa.vercel.app/)

## [Assignment[1]](https://www.dataguess.com/career-mid-level-frontend-developer-assignment)

Build an e-commerce store using React and Redux. Implement advanced filtering options such as multiple criteria, price ranges, sorting, and dynamic updates of product listings. Ensure smooth user experience and efficient data handling.

## Table of Contents
- [About](#about)
- [Features](#features) 
- [Data Flow](#data-flow)
- [API Usage](#api-usage)
- [Route Structure](#route-structure)
- [Folder Structure](#folder-structure)
- [Installing](#installing)
- [Usage](#usage)

## About

The project was set up using  TypeScript with React.js, and it includes Redux, react-router-dom, and SASS libraries. App is structured with Redux and react-router-dom. The pages are encapsulated within a MainLayout. In the MainLayout, the Header is included each time, and the pages are included within the layout as children. The project consists of a homepage and a product detail page. Home page is the page where the products are listed. In the Header, only a shopping cart and a link to the Products (homepage) are provided. The product detail page can be reached by clicking on listed products or by clicking on the product title in the cart.

## Features

- **Product Listing:** Display a list of products with images, names, prices, and other relevant details.
- **Advanced Filtering:** Implement advanced filtering options, including:
- Do a general search within the product name, brand and description
- Classify products by category.
- Select category, brand to filter products.
- Filter by scores and price range.
- **Dynamic Updates:** Experience product listings dynamically and quickly as you apply filter options.
- **Responsive Design:** Experience a responsive and user-friendly design that works seamlessly on both desktop and mobile devices.

## Data Flow

All product data is fetched from the API within the MainLayout layer. Simultaneously, after fetching data from the API, filtering options are created using that data and dispatched to the state. Due to API limitations on accessing all product information during the initial data fetch, data retrieval was set to the highest possible limit. Later, the data is called in the filtering component, where the necessary filtering parameters are constructed. The initial query is listed without any filtering. Subsequent filtering lists are recreated based on different scenarios, with performance optimization in mind. Filtering is initially performed based on the currently selected category. Creation and listing operations are performed afterward. Since the API allows string-based queries for all products, a general search was desired to make API requests. Therefore, this process is restarted for each general query. Although it may not be necessary in the current dynamics, requests are made to update product data while navigating between pages. However, requests are restricted if there is no search parameter. The displayed products are also wrapped with NavLink components provided by react-router-dom to redirect to the product detail page. Adding and removing items from the cart are handled within the detail page and the cart itself. The entire cart is stored in one state. The content of the detail page is fetched from the DummyJson API using the "product/{id}" path. The project's Sass structure is built alongside Tailwind CSS.

## API Usage

#### Fetch all items

```http
  GET / https://dummyjson.com/products/search
```

| Path | Query     | type    | Purpose of usage                |
| :-------- | :------- | :------- | :------------------------- |
| /products |  |  | All products fetched. |
| /products/search | `?q=` | `string` | All products searched. |

#### Fetch item detail

```http
  GET https://dummyjson.com/product/${id}
```

| Path | Paramater | Query     | Purpose of usage                       |
 :-------- | :-------- | :------- | :-------------------------------- |
| /product     | `id`      | `string` | Product detail was fetched. |

## Route Structure

The project consists of 3 pages. There is a `http://localhost:3000` products page in the main directory. There is product detail in the detail page detail/{id} `https://e-coomerce-kappa.vercel.app/detail/1` directory. There is a Page404 page for invalid paths. There is no button on this page that directs you to the main directory.
```
   <Routes>
      <Route path="/" element={<ProductsPage/>}/>
      <Route path="/detail/:id" element={<ProductDetailPage/>}/>
      <Route path="*" element={<Page404/>}/>
    </Routes>

```

## Folder Structure

This project follows a structured organization to maintain code clarity and scalability. Below is a tree view of the project structure:
```
├── package-lock.json
├── package.json
├── public
│ ├── favicon.ico
│ ├── index.html
│ ├── manifest.json
│ └── robots.txt
├── src
│ ├── App.tsx
│ ├── core
│ │ ├── components
│ │ │ ├── Alert
│ │ │ │ ├── alert.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── Basket
│ │ │ │ ├── basket.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── Button
│ │ │ │ └── index.tsx
│ │ │ ├── Dropdown
│ │ │ │ ├── dropdown.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── FormElements
│ │ │ │ ├── DebounceInput.tsx
│ │ │ │ └── formElements.module.scss
│ │ │ ├── Header
│ │ │ │ ├── header.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── Pages
│ │ │ │ ├── ErrorPage.tsx
│ │ │ │ ├── Page404.tsx
│ │ │ │ ├── ProductDetailPage
│ │ │ │ │ ├── Sections
│ │ │ │ │ │ ├── DetailImage
│ │ │ │ │ │ │ └── index.tsx
│ │ │ │ │ │ ├── DetailInfo
│ │ │ │ │ │ │ └── index.tsx
│ │ │ │ │ │ ├── index.tsx
│ │ │ │ │ │ └── productsPageDetailSections.module.scss
│ │ │ │ │ └── index.tsx
│ │ │ │ └── ProductsPage
│ │ │ │ ├── Sections
│ │ │ │ │ ├── Filtering
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── Headline
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── ProductList
│ │ │ │ │ │ └── index.tsx
│ │ │ │ │ ├── index.tsx
│ │ │ │ │ └── productsPageSections.module.scss
│ │ │ │ └── index.tsx
│ │ │ ├── RatingStars
│ │ │ │ ├── index.tsx
│ │ │ │ └── ratingStars.module.scss
│ │ │ ├── Section
│ │ │ │ └── index.tsx
│ │ │ └── Text
│ │ │ ├── index.tsx
│ │ │ └── text.module.scss
│ │ ├── layouts
│ │ │ ├── DetailLayout
│ │ │ │ └── index.tsx
│ │ │ └── MainLayout
│ │ │ └── index.tsx
│ │ ├── services
│ │ │ ├── index.tsx
│ │ │ └── request.tsx
│ │ ├── store
│ │ │ ├── reducer.tsx
│ │ │ └── store.tsx
│ │ ├── styes
│ │ │ ├── fonts.scss
│ │ │ ├── globals.scss
│ │ │ ├── mixins.scss
│ │ │ ├── reset.scss
│ │ │ └── variables.scss
│ │ └── utils
│ │ ├── buildQueryParams.tsx
│ │ ├── calcPercent.tsx
│ │ ├── findMinMaxByProperty.tsx
│ │ └── renderClasses.tsx
│ ├── index.tsx
│ ├── logo.svg
│ ├── react-app-env.d.ts
│ ├── reportWebVitals.ts
│ └── setupTests.ts
├── tailwind.config.js
└── tsconfig.json
```


### Installing

1. Clone the repository to your local machine using the following command:

```bash
  https://github.com/mesuttutsak/dataguess-mid-level-frontend-developer-assignment-1-e-coomerce-store.git
```

2. Install the project dependencies:

```bash
  npm install
```

### Usage

1. To run the application locally, use the following command:

```bash
  npm start
```


2. Open your web browser and go to `http://localhost:3000` to view the app.

