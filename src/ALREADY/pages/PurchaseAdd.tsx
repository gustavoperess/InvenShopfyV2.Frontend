
// import { useState, useEffect, useRef } from "react";
// import {Form, Button, Table }from 'react-bootstrap';
// import SideBarComponent from "../../../Components/SideBar/SideBarComponent";
// import NavbarComponent from "../../../Components/NavBar/NavarComponent";
// import PageIndicatorComponent from "../../../Components/PageIndicator/PageIndicatorComponent";
// import { useGetAllSuppliersQuery } from "../../../Services/People/Supplier";
// import { useCreatePurchaseMutation } from "../../../Services/Purchase/Purchase";
// import {useGetProductByNameQuery} from "../../../Services/Product/Products";
// import { useGetAllWarehousesQuery } from "../../../Services/Warehouse/Warehouse";






// function useDebounce(value: string, delay : number) {
//     const [debouncedValue, setDebouncedValue] = useState(value); 

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => clearTimeout(handler);
//     }, [value, delay]);

//     return debouncedValue;
// }

// const getTodayDate = () => {
//     const today = new Date();
//     const yyyy = today.getFullYear();
//     const mm = String(today.getMonth() + 1).padStart(2, '0');
//     const dd = String(today.getDate()).padStart(2, '0');
//     return `${yyyy}-${mm}-${dd}`;
// };

// export const PurchasePage = () => {
//     const [purchaseDate, setPurchaseDate] = useState<string>(getTodayDate()); 
//     const [warehouseId, setWarehouse] = useState<number | null>();
//     const [supplierId, setSupplierId] = useState<number | null>();
//     const [product, setProduct] = useState<string>("");
//     const [productName, setProductName] = useState<string>("");
//     const [productInformation, setProductInformation] = useState<Array<{ 
//         id: number; 
//         title: string; 
//         productImage: string; 
//         category: string;
//         productCode: number,
//         stockQuantity: number,
//         subcategory: string,
//         price: number;
//         quantityBought: number;
//         totalQuantityBought: number, 
//     }>>([]);
//     const [shippingCost, setShippingCost] = useState<number>(0);
//     const [purchaseNote, setPurchaseNote] = useState<string>("");
//     const [purchaseStatus, setPurchaseStatus] = useState<string>("");
//     const debouncedSearchTerm = useDebounce(productName, 500);
//     const formRef = useRef<HTMLFormElement>(null);
//     const [addPurchase] = useCreatePurchaseMutation();
//     const [suggestions, setSuggestions] = useState<Array<{ 
//             id: number; 
//             title: string; 
//             productImage: string; 
//             category: string;
//             productCode: number,
//             stockQuantity: number,
//             subcategory: string,
//             price: number;
//         }>>([]);
//     const { data : warehousesData } = useGetAllWarehousesQuery(1);
//     const {data : supplierData} = useGetAllSuppliersQuery(1);

//     const { data: productSuggestionsData } = useGetProductByNameQuery(debouncedSearchTerm, { 
//         skip: debouncedSearchTerm.trim().length === 0  
//     });

  
    


//     useEffect(() => {
//         if (debouncedSearchTerm.trim().length > 0 && productSuggestionsData) {
//             setSuggestions(productSuggestionsData.data);  
//         } else {
//             setSuggestions([]);  
//         }
//     }, [debouncedSearchTerm, productSuggestionsData]);

//     useEffect(() => {
//         if (supplierData && supplierData.data.length > 0 && !supplierId) {
//             setSupplierId(supplierData.data[0].id);
//         }
//         if (warehousesData && warehousesData.data.length > 0 && !warehouseId) {
//             setWarehouse(warehousesData.data[0].id);
//         }

//     }, [supplierData, supplierId, warehousesData, warehouseId]);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         let productIdPlusQuantity: { [key: number]: number } = {};
//         productInformation.forEach(product => {
//             productIdPlusQuantity[product.id] = product.quantityBought; 
//         });
        
//         const purchaseData = { 
//             purchaseDate,
//             warehouseId, 
//             supplierId, 
//             productIdPlusQuantity, 
//             purchaseNote, 
//             shippingCost,
//             purchaseStatus, 
//             TotalAmountBought,
//             totalNumberOfProducts
//         };
//         console.log(purchaseData);
    
//         try {
//             await addPurchase(purchaseData).unwrap();
//             setShippingCost(0);
//             setProductInformation([]); // Clear products after successful submission
//             formRef.current?.reset();
//         } catch (error) {
//             console.error("Error submitting the form", error);
//         }
//     }
    

//     const warehouseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectWarehouseById = Number(e.target.value);
//         setWarehouse(selectWarehouseById);
//     }

//     const supplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectSupplierId = Number(e.target.value);
//         setSupplierId(selectSupplierId);
//     }

//     const onTypeChangeForProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setProduct(value);
//         setProductName(value);
//     };

//     const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPurchaseDate(e.target.value)
//     }

//     const selectSuggestion = (suggestion: { 
//         id: number; 
//         title: string; 
//         productImage: string; 
//         category: string;
//         productCode: number,
//         stockQuantity: number,
//         subcategory: string,
//         price: number;
//         }) => {
//         const existingProductIndex = productInformation.findIndex(product => product.title === suggestion.title);
//         if (existingProductIndex != -1) {
//             setProductInformation(prev => {
//                 const updateProducts = prev.map((product, index) => {
//                     if (index === existingProductIndex && product.stockQuantity > 0) {
//                         return {
//                             ...product,
//                             TotalAmountBought: product.totalQuantityBought  * product.price
//                         };
//                     }
//                     return product
//                 });
//                 return updateProducts
//             });
//         } else {
//             setProductInformation(prev => [...prev, {...suggestion, quantityBought: 1, totalQuantityBought: suggestion.price}]);
//         }
 

//         setSuggestions([]);
//         setProduct("");
//     };
   
//     const shippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectShippingPrice = Number(e.target.value);
//         setShippingCost(selectShippingPrice);
//     }

//     const purchaseStatusChage = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const setPurchaseStatusId = (e.target.value);
//         setPurchaseStatus(setPurchaseStatusId);
//     }
//     const purchaseNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setPurchaseNote(e.target.value);
//     };


//     const handleRemoveProduct = (productId: number) => {
//         setProductInformation((prevProducts) =>
//             prevProducts.filter((product) => product.id !== productId)
//         );
//     };



//     let productSum = (productInformation.reduce((acumulator, current) => acumulator + current.totalQuantityBought * current.quantityBought, 0))
//     let totalNumberOfProducts = (productInformation.reduce((acumulator, current) => acumulator + current.quantityBought, 0))
//     let TotalAmountBought = productSum + shippingCost 



//     return (
//         <div className="dashboard-container">
//             <div className="sidebar">
//                 <SideBarComponent />
//             </div>
//             <div className="main-content">
//                 <div className="header">
//                     <NavbarComponent />
//                     <PageIndicatorComponent title="New Purchase" subtitle="Purchase" />
//                 </div>
//                 <div className="container-main">
//                     <div className="product-list">
//                         <Form onSubmit={handleSubmit}>
//                             <div className="form-row">
//                                 <Form.Group className="form-col-33" onChange={onDateChange} controlId="formPurchaseDate">
//                                     <Form.Label>Date</Form.Label>
//                                     <Form.Control type="date" 
//                                       value={purchaseDate}
//                                       onChange={onDateChange}
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="form-col-33" controlId="formWarehouse">
//                                     <Form.Label>Select Warehouse</Form.Label>
//                                     <Form.Select aria-label="Default select example" onChange={warehouseChange} value={warehouseId || ""}>
//                                         {warehousesData && warehousesData.data.map((warehouse: { id: number, warehouseName: string }) => (
//                                             <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouseName}</option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                                 <Form.Group className="form-col-33" controlId="formSupplier">
//                                     <Form.Label>Select Supplier</Form.Label>
//                                     <Form.Select aria-label="Default select example" onChange={supplierChange} value={supplierId || ""}>
//                                         {supplierData && supplierData.data.map((supplier: { id: number, name: string }) => (
//                                             <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </div>
//                             <div className="form-row">
//                                 <Form.Group className="form-col-100" controlId="formProductName">
//                                     <Form.Label>Product</Form.Label>
//                                     <Form.Control 
//                                         type="text"  
//                                         placeholder="Example: Macbook..." 
//                                         value={product} 
//                                         onChange={onTypeChangeForProduct} 
//                                     />
//                                     {suggestions.length > 0 && (
//                                         <div className="autocomplete-suggestions">
//                                             {suggestions.map((suggestion) => (
//                                                 <div className="suggestion-item" key={suggestion.id} onClick={() => selectSuggestion(suggestion)}>
//                                                     <img src={suggestion?.productImage === "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : suggestion?.productImage} className='imageList' />
//                                                     {suggestion.title}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </Form.Group>
//                             </div>
//                             <div className="form-row">
//                                 <Form.Group className="form-col-50" onChange={shippingChange} controlId="formShippingCost">
//                                     <Form.Label>Shipping Cost</Form.Label>
//                                     <Form.Control type="number" min="0" />
//                                 </Form.Group>
//                                 <Form.Group className="form-col-50" onChange={purchaseStatusChage} controlId="formPurchaseStatus">
//                                     <Form.Label>Purchase Status</Form.Label>
//                                     <Form.Select aria-label="Default select example">
//                                         <option value="Complete">Complete</option>
//                                         <option value="Incomplete">Incomplete</option>
//                                         <option value="Drafts">Drafts</option>
//                                     </Form.Select>
//                                 </Form.Group>
//                             </div>
//                             <div className="form-row">
//                                 <Form.Group className="form-col-50" controlId="formPurchaseNote">
//                                     <Form.Label>Purchase Note</Form.Label>
//                                     <Form.Control 
//                                         as="textarea" 
//                                         rows={3} 
//                                         value={purchaseNote}
//                                         onChange={purchaseNoteChange}
//                                     />
//                                 </Form.Group>
//                             </div>
    
//                             {productInformation.length > 0 && (
//                                 <div className="selected-products-container">
//                                     <Table striped bordered hover>
//                                         <thead>
//                                             <tr>
//                                                 <th>Id</th>
//                                                 <th>Image</th>
//                                                 <th>Product</th>
//                                                 <th>Code</th>
//                                                 <th>Category</th>
//                                                 <th>Sub-Category</th>
//                                                 <th>Price</th>
//                                                 <th>Stock</th>
//                                                 <th>Quantity</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {productInformation.map((productInfo) => (
//                                                 <tr key={productInfo.id}>
//                                                     <td>{productInfo.id}</td>
//                                                     <td>
//                                                         <img src={productInfo?.productImage === "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : productInfo?.productImage} className='imageList' />
//                                                     </td>
//                                                     <td>{productInfo.title}</td>
//                                                     <td>{productInfo.productCode}</td>
//                                                     <td>{productInfo.category}</td>
//                                                     <td>{productInfo.subcategory}</td>
//                                                     <td>{productInfo.price}</td>
//                                                     <td>{productInfo.stockQuantity}</td>
//                                                     <td>
//                                                     <Form.Control
//                                                             type="number"
//                                                             min="0"
//                                                             placeholder="0"
//                                                             // value={productInfo.quantityBought} 
//                                                             onChange={(e) => {
//                                                                 const newQuantity = Number(e.target.value);
//                                                                 setProductInformation((prev) =>
//                                                                     prev.map((prod) => {
//                                                                         if (prod.id === productInfo.id) {
//                                                                             const adjustedStock = prod.stockQuantity + (newQuantity - prod.quantityBought);
//                                                                             return {
//                                                                                 ...prod,
//                                                                                 quantityBought: newQuantity,
//                                                                                 stockQuantity: adjustedStock > 0 ? adjustedStock : prod.stockQuantity, 
//                                                                             };
//                                                                         }
//                                                                         return prod;
//                                                                     })
//                                                                 );
//                                                             }}
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <Button variant="danger" onClick={() => handleRemoveProduct(productInfo.id)}>
//                                                             Remove
//                                                         </Button>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </Table>
//                                     <div className="total-calculator">
//                                         <ul>
//                                             <li>Total Amount: ${productSum}</li>
//                                             <li>Number of products: {totalNumberOfProducts}</li>
//                                             <li>Shipping: ${shippingCost}</li>
//                                             <li>Grand Total: ${TotalAmountBought}</li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             )}
//                             <Button variant="primary" type="submit">
//                                 Add Purchase
//                             </Button>
//                         </Form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
    
// }

// export default PurchasePage