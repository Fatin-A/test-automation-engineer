# Test Cases: Fruit Stall App

---

## Frontend Test Cases

### TC_UI_001 – Display Products List
- **Description**: Verify that the product list displays correctly.
- **Steps**:
  1. Navigate to `/products/list`.
- **Expected Result**: All products are listed with image placeholder, name, price, and 3 action buttons.
- **Priority**: High

### TC_UI_002 – Create Product Button
- **Description**: Test the visibility and navigation of the "Create" button.
- **Steps**:
  1. Click the green `Create` button.
- **Expected Result**: Navigates to product creation form.
- **Priority**: Medium

### TC_UI_003 – Edit Product
- **Description**: Test if clicking `Edit` brings up the edit page/form.
- **Steps**:
  1. Click `Edit` on any product.
- **Expected Result**: Product edit form is shown with prefilled data.
- **Priority**: High

### TC_UI_004 – Delete Product Confirmation
- **Description**: Confirm deletion action works properly.
- **Steps**:
  1. Click `Delete` on any product.
  2. Confirm prompt if applicable.
- **Expected Result**: Product is removed from the list.
- **Priority**: High

### TC_UI_005 – Place Order
- **Description**: Test if `Order` button works and routes to order creation.
- **Steps**:
  1. Click `Order` for any product.
- **Expected Result**: Order page is loaded or action is triggered.
- **Priority**: Medium

---

## Backend API Test Cases (via Swagger)

### TC_API_001 – GET /products
- **Description**: Validate that product list is returned.
- **Method**: `GET /products`
- **Expected Result**: HTTP 200 with array of products.
- **Priority**: High

### TC_API_002 – POST /products
- **Description**: Test creating a new product.
- **Method**: `POST /products`
- **Payload**:
  ```json
  {
    "name": "Kiwi",
    "price": 5.5,
    "description": "Tangy and refreshing kiwi"
  }
- **Expected Result**: HTTP 201 Created
- **Priority**: High

### TC_API_003 – PUT /products/{id}
- **Description**: Update product details.
- **Method**:  PUT /products/{id}
- **Payload**:
  ``` json
  Copy
  Edit
  {
    "name": "Kiwi (updated)",
    "price": 6.0,
    "description": "Updated description"
  }

 **Expected Result**: HTTP 200 OK
- **Priority**: Medium

### TC_API_004 – DELETE /products/{id}
- **Description**: Delete a product.
- **Method**: DELETE /products/{id}
 **Expected Result**: HTTP 200 OK or 204 No Content
- **Priority**: High

### TC_API_005 – POST /orders
- **Description**: Create a new order.
- **Method**: POST /orders
- **Payload**:
  ``` json
  Copy 
  Edit
  {
    "productId": 1,
    "quantity": 3
  }
 **Expected Result**: HTTP 201 Created with order ID
- **Priority**: Medium
