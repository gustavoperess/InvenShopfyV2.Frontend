// import * as React from 'react';
// import SideBarComponent from "../../../Components/SideBar/SideBarComponent";
// import NavbarComponent from "../../../Components/NavBar/NavarComponent";
// import PageIndicatorComponent from "../../../Components/PageIndicator/PageIndicatorComponent";
// import './AddProduct.css';
// import {Form, Button }from 'react-bootstrap';
// import { useGetAllProductsUnitQuery } from "../../../Services/Product/Unit";
// import { useGetAllProductsBrandQuery } from "../../../Services/Product/Brand";
// import {useState, useEffect, useRef, useCallback} from "react";
// import { useGetAllProductsCategoryQuery, useGetProductByIdQuery } from "../../../Services/Product/Category";
// import { useAddProductMutation } from "../../../Services/Product/Products";
// import {Accept, useDropzone} from "react-dropzone";

// export const ProductsAddPage = () => {
//     const { data: totalUnitData, error: totalUnitError, isLoading: totalUnitLoading } = useGetAllProductsUnitQuery(1);
//     const { data: totalBrandData, error: totalBrandError, isLoading: totalBrandLoading } = useGetAllProductsBrandQuery(1);
//     const { data: totalCategoryData, error: totalCategoryError, isLoading: totalCategoryLoading } = useGetAllProductsCategoryQuery(1);
//     const [title, setTitle] = useState<string>("");
//     const [categoryId, setCategoryId] = useState<number>(0);
//     const [subCategory, setSubCategory] = useState<string>("");
//     const [productCode, setProductCode] = useState<number>(0);
//     const [brandId, setBrandId] = useState<number>(0);
//     const [quantity, setQuantity] = useState<number>(0);
//     const [price, setPrice] = useState<number>(0);
//     const [unitId, setUnitId] = useState<number>(0);
//     const [feature, setFeature] = useState<boolean | false>(false);
//     const [warehousePrice, setWarehousePrice] = useState<boolean | false>(false);
//     const [expired, setExpired] = useState<boolean | false>(false);
//     const [sale, setSale] = useState<boolean | false>(false);
//     const [variant, setVariant] = useState<boolean | false>(false);
//     const [subCategories, setSubCategories] = useState<string[]>([]);
//     const [addProduct] = useAddProductMutation();
//     const formRef = useRef<HTMLFormElement>(null);
//     const { data: subCategoryData } = useGetProductByIdQuery(categoryId || 0, { skip: !categoryId });
//     const [productImage, setproductImage] = useState<string | null>(null);

//     useEffect(() => {
//         if (subCategoryData) {
//             setSubCategories(subCategoryData.data.subCategory || []);
//         }
//     }, [subCategoryData]);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const productData = {title, price, quantity, productCode, unitId, brandId, categoryId, subCategory, feature, warehousePrice, expired, sale, variant, productImage};
//         console.log(productData)
//         try {
//             await addProduct(productData).unwrap();
//             setTitle('');
//             setPrice(0);
//             setQuantity(0);
//             setProductCode(0);
//             setUnitId(0);
//             setBrandId(0);
//             setFeature(false);
//             setproductImage(null);
//             setWarehousePrice(false);
//             setSale(false);
//             formRef.current?.reset();
//             console.log("Product added successfully");
//         } catch (error) {
//             console.error("Error submitting the form", error);
//         }
//     };
    
//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         if (acceptedFiles.length > 0) {
//             const file = acceptedFiles[0]; 
//             const reader = new FileReader();
            
//             reader.onloadend = () => {
//                 const base64String = reader.result as string; // Cast to string
//                 setproductImage(base64String); // Store Base64 string instead of File object
//             };
            
//             reader.readAsDataURL(file); // Read the file as Data URL (Base64)
//         }
//     }, []);

//     const accept: Accept = {
//         'image/*': []
//     };

//     const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

//     const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         setTitle(e.target.value);
//     }
//     const priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPrice(Number(e.target.value));
//     }
//     const quantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setQuantity(Number(e.target.value));
//     }
//     const codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setProductCode(Number(e.target.value));
//     }

//     const unitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setUnitId(Number(e.target.value));
//     }
//     const brandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setBrandId(Number(e.target.value));
//     }
//     const categoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedCategoryId = Number(e.target.value);
//         setCategoryId(selectedCategoryId);
//     }
//     const subCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSubCategory(e.target.value);
//     }
//     const featureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFeature(e.target.checked);
//     }
//     const warehousePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setWarehousePrice(e.target.checked);
//     }
//     const expiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setExpired(e.target.checked);
//     }
//     const saleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSale(e.target.checked);
//     }
//     const variantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setVariant(e.target.checked);
//     }

//     if (totalUnitError || totalUnitLoading) return <div>Error loading data</div>;
//     if (totalBrandError || totalBrandLoading) return <div>Error loading data</div>;
//     if (totalCategoryError || totalCategoryLoading) return <div>Error loading data</div>;

//     return (
//         <div className="dashboard-container">
//             <div className="sidebar">
//                 <SideBarComponent/>
//             </div>
//             <div className="main-content">
//                 <div className="header">
//                     <NavbarComponent/>
//                     <PageIndicatorComponent title="Products" subtitle="Add"/>
//                 </div>
//                 <div className="container-main">
//                     <div className="add-product">
//                         <Form onSubmit={handleSubmit}>
//                             <div className="form-row">
//                                 <Form.Group className="form-col-70" onChange={titleChange} controlId="formProductName">
//                                     <Form.Label>Product Name</Form.Label>
//                                     <Form.Control type="text" placeholder="Enter Product"/>
//                                 </Form.Group>

//                                 <Form.Group className="form-col-30" controlId="formCategory">
//                                     <Form.Label>Category</Form.Label>
//                                     <Form.Select aria-label="Default select example" onChange={categoryChange}>
//                                         {totalCategoryData && totalCategoryData.data.map((unit: {
//                                             id: number,
//                                             mainCategory: string
//                                         }) => (
//                                             <option key={unit.id} value={unit.id}>{unit.mainCategory}</option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </div>
//                             <div className="form-row">
//                                 <Form.Group className="form-col-33" controlId="formSubCategory">
//                                     <Form.Label>Sub-Category</Form.Label>
//                                     <Form.Select aria-label="Default select example" onChange={subCategoryChange}>
//                                         {subCategories.map((subCategory, index) => (
//                                             <option key={index} value={subCategory}>{subCategory}</option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>

//                                 <Form.Group className="form-col-33" onChange={codeChange} controlId="formProductCode">
//                                     <Form.Label>Product Code</Form.Label>
//                                     <Form.Control type="number" min="0" placeholder="Enter Product Code"/>
//                                 </Form.Group>
//                                 <Form.Group className="form-col-33" controlId="formBrand">
//                                     <Form.Label>Brand</Form.Label>
//                                     <Form.Select aria-label="Default select example" onChange={brandChange}>
//                                         {totalBrandData && totalBrandData.data.map((unit: {
//                                             id: number,
//                                             title: string
//                                         }) => (
//                                             <option key={unit.id} value={unit.id}>{unit.title}</option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </div>
//                             <div className="form-row">
//                                 {/* <Form.Group className="form-col-33" onChange={quantityChange} controlId="formQuantity">
//                                     <Form.Label>Quantity</Form.Label>
//                                     <Form.Control type="number" min="0" placeholder="Enter Quantity"/>
//                                 </Form.Group> */}
//                                 <Form.Group className="form-col-33" onChange={priceChange} controlId="formMoneyInput">
//                                     <Form.Label>Product Price</Form.Label>
//                                     <Form.Control type="number" min="0" placeholder="Enter amount"/>
//                                 </Form.Group>
//                                 <Form.Group className="form-col-33" controlId="formProductUnit">
//                                     <Form.Label>Product Unit</Form.Label>
//                                     <Form.Select aria-label="Default select example" onChange={unitChange}>
//                                         {totalUnitData && totalUnitData.data.map((unit: {
//                                             id: number,
//                                             title: string
//                                         }) => (
//                                             <option key={unit.id} value={unit.id}>{unit.title}</option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </div>
//                             <Form.Group className="mb-3" onChange={featureChange} controlId="formBasicCheckbox">
//                                 <Form.Check type="checkbox" label="Add Featured"/>
//                                 <Form.Text id="passwordHelpBlock" muted>
//                                     This product will be displayed in POS
//                                 </Form.Text>
//                             </Form.Group>
//                             <Form.Group className="mb-3" onChange={warehousePriceChange} controlId="formBasicCheckbox">
//                                 <Form.Check type="checkbox" label="Different price for different warehouse"/>
//                             </Form.Group>
//                             <Form.Group className="mb-3" onChange={expiredChange} controlId="formBasicCheckbox">
//                                 <Form.Check type="checkbox" label="This product has date expired"/>
//                             </Form.Group>
//                             <Form.Group className="mb-3" onChange={saleChange} controlId="formBasicCheckbox">
//                                 <Form.Check type="checkbox" label="Add Promotional Sale"/>
//                             </Form.Group>
//                             <Form.Group className="mb-3" onChange={variantChange} controlId="formBasicCheckbox">
//                                 <Form.Check type="checkbox" label="This product has multi variant"/>
//                             </Form.Group>
//                             <Button variant="primary" type="submit">
//                                 Create Product
//                             </Button>
//                         </Form>
//                     </div>
//                     <div className="new-container">
//                         <div className="form-row-dropzone-two">
//                             <div {...getRootProps({className: 'dropzone-two'})}>
//                                 <input {...getInputProps()} />
//                                 {productImage ? (
//                                 <img src={productImage} alt="Selected" className="preview-image"/>
//                                 ) : (
//                                     <>
//                                         <h3>Drop product image here</h3>
//                                         <h1>or</h1>
//                                         <Button>Browse File</Button>
//                                         <p>Allowed JPEG, JPG & PNG FORMAT | Max 100 mb</p>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };