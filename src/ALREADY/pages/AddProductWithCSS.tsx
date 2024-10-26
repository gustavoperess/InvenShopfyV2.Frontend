// "use client"
// import React, { useState, useEffect, useCallback } from 'react';
// import {Accept, useDropzone} from "react-dropzone";
// import Image from 'next/image';
// import { MenuItem, TextField, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
// import dropProductImg from '../../../../public/assets/img/icon/drag.png';
// import Checkbox from '@mui/material/Checkbox';
// import { FormControlLabel } from '@mui/material'
// import { FileUploader } from 'react-drag-drop-files';
// const fileTypes = ["JPG", "PNG", "GIF"];
// import { useAddProductMutation } from '@/services/Product/Product';
// import { useGetAllProductsUnitQuery } from '@/services/Product/Unit';
// import { useGetAllProductsBrandQuery } from '@/services/Product/Brand';
// import { useGetAllProductsCategoryQuery, useGetProductByIdQuery } from '@/services/Product/Category';



// // Define the structure of the data
// interface mainCategoryData {
//     mainCategory: string;
//     id: number;
//     subCategory: string;
//   }

// interface brandData {
//     id: number;
//     title: string;
// }

// interface unitData {
//     id: number;
//     title: string;
// }


// const AddProduct = () => {
//     const [selectedCategory, setSelectedCategory] = useState<number | string>("");

//     const [selectedTitle, setSelectedTitle] = useState<string>("");
//     const [selectedBrand, setSelectedBrand] =useState<string>("");
//     const [selectedUnit, setSelectedUnit] =useState<string>("");
//     const [selectedPrice, setSelectedPrice] = useState<number>(0);
//     const [selectedCode, setSelectedCode] =  useState<string>("");
//     const [feature, setFeature] = useState<boolean | false>(false);
//     const [warehousePrice, setWarehousePrice] = useState<boolean | false>(false);
//     const [expired, setExpired] = useState<boolean | false>(false);
//     const [sale, setSale] = useState<boolean | false>(false);
//     const [productImage, setProductImage] = useState<string | null>(null);
  

//     const [selectCategoryId, setSelectCategoryId] = useState<number>(0);
//     const [selectSubCategory, setSelectSubCategory] = useState<string>("");


//     const [subCategories, setSubCategories] = useState<string[]>([]);
//     const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
//     const [currentPageSize, setCurrentPageSize] = useState(10);
//     const { data: totalUnitData, error: totalUnitError, isLoading: totalUnitLoading } = useGetAllProductsUnitQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
//     const { data: totalBrandData, error: totalBrandError, isLoading: totalBrandLoading } = useGetAllProductsBrandQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
//     const { data: totalCategoryData, error: totalCategoryError, isLoading: totalCategoryLoading } = useGetAllProductsCategoryQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
//     const { data: subCategoryData } = useGetProductByIdQuery(Number(selectedCategory) || 0, { skip: !selectedCategory});
  

//     useEffect(() => {
//         if (subCategoryData) {
//             setSubCategories(subCategoryData.data.subCategory || []);
//         }
//     }, [subCategoryData]);
   

//     //react drag and drop image
//     const [files, setFiles] = useState<File[]>([]);
    
//     const handleChange = (file: File) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const base64String = reader.result as string;
//             const base64Data = base64String.split(',')[1];
//             setProductImage(base64Data);
//           }
//         reader.readAsDataURL(file); 
//         setFiles([...files, file]);
//     };

//     const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         const reader = new FileReader();
//         if (file) {
//           reader.onloadend = () => {
//             const base64String = reader.result as string;
//             const base64Data = base64String.split(',')[1];
//             setProductImage(base64Data);
//           }
//           reader.readAsDataURL(file); 
//         }
//       }, []);


//     //remove drag and drop image
//     const handleRemove = (index: any) => {
//         const remainingFiles = files.filter((item, i) => i !== index);
//         setFiles(remainingFiles);
//     };
 

    
//     // handlers
//     const handleCategoryChange = (e: SelectChangeEvent<number | string>) => {
//         setSelectedCategory(e.target.value); 
//     };

//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         if (acceptedFiles.length > 0) {
//             const file = acceptedFiles[0]; 
//             const reader = new FileReader();
            
//             reader.onloadend = () => {
//                 const base64String = reader.result as string; // Cast to string
//                 setProductImage(base64String); // Store Base64 string instead of File object
//             };
            
//             reader.readAsDataURL(file); // Read the file as Data URL (Base64)
//         }
//     }, []);

//     const accept: Accept = {
//         'image/*': []
//     };

//     const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });


//     return (
//         <>
//             <div className="inventual-content-area px-4 sm:px-7">
//                 <div className="inventual-addproduct-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5 mt-7">
//                     <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
//                         <div className="col-span-12 xl:col-span-9 lg:col-span-8 lg:order-1 maxMd:order-2">
//                             <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
//                                 <div className="col-span-12 xl:col-span-12 lg:col-span-12">
//                                     <div className="inventual-select-field">
//                                         <div className="inventual-form-field">
//                                             <h5>Product Name</h5>
//                                             <div className="inventual-input-field-style">
//                                                 <input  onChange={(e) => setSelectedTitle(e.target.value)} type="text" placeholder='HP Elitebook' />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-span-12 xl:col-span-4 md:col-span-6">
//                                     <div className="inventual-select-field">
//                                         <div className="inventual-form-field">
//                                             <h5>Category</h5>
//                                             <div className="inventual-select-field-style">
//                                                 <FormControl fullWidth>
//                                                     <InputLabel>Select Category</InputLabel>
//                                                     <Select
//                                                         label="Select"
//                                                         value={selectedCategory}
//                                                         onChange={handleCategoryChange}
//                                                         displayEmpty
//                                                         renderValue={(value) => {
//                                                             const selectedCategoryItem = totalCategoryData?.data.find(
//                                                                 (category: mainCategoryData) => category.id === Number(value)
//                                                             );
//                                                             return selectedCategoryItem ? selectedCategoryItem.mainCategory : <em>Select Category</em>;
//                                                         }}
//                                                     >
//                                                         {totalCategoryData && totalCategoryData.data.length > 0 ? (
//                                                             totalCategoryData.data.map((mainCategory: mainCategoryData) => (
//                                                                 <MenuItem key={mainCategory.id} value={mainCategory.id}>
//                                                                     {mainCategory.mainCategory}
//                                                                 </MenuItem>
//                                                             ))
//                                                         ) : (
//                                                             <MenuItem value="">
//                                                                 <em>No Categories Available</em>
//                                                             </MenuItem>
//                                                         )}
//                                                     </Select>
//                                                 </FormControl>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-span-12 xl:col-span-4 md:col-span-6">
//                                     <div className="inventual-select-field">
//                                         <div className="inventual-form-field">
//                                             <h5>Sub-Category</h5>
//                                             <div className="inventual-select-field-style">
//                                                 <TextField
//                                                     select
//                                                     label="Select"
//                                                     value={selectSubCategory}
//                                                     onChange={(e) => setSelectSubCategory(e.target.value)}
//                                                     SelectProps={{
//                                                         displayEmpty: true,
//                                                         renderValue: (value: any) => {
//                                                             // Correctly find the selected sub-category
//                                                             const selectedSubCategory = subCategories.find((subCategory) => subCategory === value);
//                                                             return selectedSubCategory ? selectedSubCategory : <em>Select Sub-Category</em>;
//                                                         },
//                                                     }}
//                                                 >
//                                                     {subCategories.length > 0 ? (
//                                                         subCategories.map((subCategory, index) => (
//                                                             <MenuItem key={subCategory} value={subCategory}>
//                                                                 {subCategory}
//                                                             </MenuItem>
//                                                         ))
//                                                     ) : (
//                                                         <MenuItem value="">
//                                                             <em>No Sub-Categories Available</em>
//                                                         </MenuItem>
//                                                     )}
//                                                 </TextField>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-span-12 xl:col-span-4 md:col-span-6">
//                                     <div className="inventual-select-field">
//                                         <div className="inventual-form-field">
//                                             <h5>Product Code</h5>
//                                             <div className="inventual-input-field-style">
//                                                 <input onChange={(e) => setSelectedTitle(e.target.value)} type="text" placeholder='8952202236' />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-span-12 xl:col-span-4 md:col-span-6">
//                                     <div className="inventual-select-field">
//                                         <div className="inventual-form-field">
//                                             <h5>Brand</h5>
//                                             <div className="inventual-select-field-style">
//                                                 <TextField
//                                                     select
//                                                     label="Select"
//                                                     value={selectedBrand}
//                                                     onChange={(e) => setSelectedBrand(e.target.value)}
//                                                     SelectProps={{
//                                                         displayEmpty: true,
//                                                         renderValue: (value: any) => {
//                                                             const selectedBrand = totalBrandData?.data.find((brand: brandData) => brand.id === value);
//                                                             return selectedBrand ? selectedBrand.title : <em>Select Brand</em>;
//                                                         },
//                                                     }}>
//                                                     {totalBrandData && totalBrandData.data.length > 0 ? (
//                                                             totalBrandData.data.map((brand: brandData) => (
//                                                                 <MenuItem key={brand.id} value={brand.id}>
//                                                                     {brand.title}
//                                                                 </MenuItem>
//                                                             ))
//                                                         ) : (
//                                                             <MenuItem value="">
//                                                                 <em>No Brands Available</em>
//                                                             </MenuItem>
//                                                         )}
//                                                 </TextField>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-span-12 xl:col-span-4 md:col-span-6">
//                                     <div className="inventual-select-field">
//                                         <div className="inventual-form-field">
//                                             <h5>Product Unit</h5>
//                                             <div className="inventual-select-field-style">
//                                                 <TextField
//                                                     select
//                                                     label="Select"
//                                                     value={selectedUnit}
//                                                     onChange={(e) => setSelectedUnit(e.target.value)}
//                                                     SelectProps={{
//                                                         displayEmpty: true,
//                                                         renderValue: (value: any) => {
//                                                             const selectedUnit = totalUnitData?.data.find((unit: unitData) => unit.id === value);
//                                                             return selectedUnit ? selectedUnit.title : <em>Select Unit</em>;
//                                                         },
//                                                     }}>
//                                                         {totalUnitData && totalUnitData.data.length > 0 ? (
//                                                         totalUnitData.data.map((unit: unitData) => (
//                                                             <MenuItem key={unit.id} value={unit.id}>
//                                                                 {unit.title}
//                                                             </MenuItem>
//                                                         ))
//                                                     ) : (
//                                                         <MenuItem value="">
//                                                             <em>No Units Available</em>
//                                                         </MenuItem>
//                                                         )}
//                                                 </TextField>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-span-12 xl:col-span-4 md:col-span-6">
//                                     <div className="inventual-select-field">
//                                         <div className="inventual-form-field">
//                                             <h5>Product Price</h5>
//                                             <div className="inventual-input-field-style">
//                                                 <input type="text" onChange={(e) => setSelectedPrice(Number(e.target.value))} value={selectedPrice} placeholder='0' />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <div className="col-span-12 xl:col-span-3 lg:col-span-4 lg:order-2 maxMd:order-1">
//                             <div className='inventual-product-image-upload rounded-lg relative overflow-hidden'>
//                                 <FileUploader
//                                     maxSize={100}
//                                     classes="inventual-input-upload-btn"
//                                     onDrop={(file: File) => handleChange(file)}
//                                     label="Browse File"
//                                     handleChange={handleChange}
//                                     name="file"
//                                     types={fileTypes}
//                                 >
//                                     <div className="inventual-product-dragdrop ngx-file-drop__drop-zone text-center border border-dashed border-primary bg-[#F8FAFF]">
//                                         <span className="flex justify-center items-center mb-6 pb-0.5"><Image src={dropProductImg} alt="user not found" priority /></span>
//                                         <h5 className="text-[20px] font-semibold text-heading mb-4">Drop product image here</h5>
//                                         <span className="block text-[20px] font-semibold text-heading mb-7">Or</span>
//                                         <button type="submit" className="inventual-btn">Browse File</button>
//                                         <span className="text-[14px] text-heading font-medium block pt-7">Allowed JPEG, JPG & PNG format  |  Max 100 mb</span>
//                                     </div>
//                                 </FileUploader>
//                                 <div className="flex flex-wrap gap-4 mt-7">
//                                     {files.map((file, index) => (
//                                         <div key={index} className="inventual-drag-product-img">
//                                             <Image src={URL.createObjectURL(file)} width={60} height={60} alt={`Uploaded File ${index}`} />
//                                             <button className='inventual-inventual-drag-close' onClick={() => handleRemove(index)}>X</button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div> */}
//                         {/* <div className="col-span-12 xl:col-span-3 lg:col-span-4 lg:order-2 maxMd:order-1">
//                                     <div className="inventual-product-image-upload rounded-lg relative overflow-hidden bg-white shadow-md">
//                                         <FileUploader
//                                             maxSize={100}
//                                             classes="inventual-input-upload-btn"
//                                             onDrop={(file: File) => handleChange(file)}
//                                             label="Browse File"
//                                             handleChange={handleChange}
//                                             name="file"
//                                             types={fileTypes}
//                                         >
//                                             <div className="inventual-product-dragdrop ngx-file-drop__drop-zone text-center border border-dashed border-primary bg-[#F8FAFF] p-4">
//                                                 <span className="flex justify-center items-center mb-6">
//                                                     <Image src={dropProductImg} alt="Drag and drop or upload" priority />
//                                                 </span>
//                                                 <h5 className="text-[20px] font-semibold text-heading mb-4">Drop product image here</h5>
//                                                 <span className="block text-[20px] font-semibold text-heading mb-7">Or</span>
//                                                 <button type="submit" className="inventual-btn">Browse File</button>
//                                                 <span className="text-[14px] text-heading font-medium block pt-7">Allowed JPEG, JPG & PNG format  |  Max 100 MB</span>
//                                             </div>
//                                         </FileUploader>

//                                         <div className="flex flex-wrap gap-4 mt-7 p-4">
//                                             {files.map((file, index) => (
//                                                 <div key={index} className="inventual-drag-product-img relative">
//                                                     <Image
//                                                         src={URL.createObjectURL(file)}
//                                                         width={100}
//                                                         height={100}
//                                                         alt={`Uploaded File ${index}`}
//                                                         className="rounded-md border border-gray-200 shadow-sm"
//                                                     />
//                                                     <button
//                                                         className="inventual-inventual-drag-close absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                                                         onClick={() => handleRemove(index)}
//                                                     >
//                                                         X
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div> */}
//                       <div className="col-span-12 xl:col-span-3 lg:col-span-4 lg:order-2 maxMd:order-1">
//                         <div className="inventual-product-dragdrop ngx-file-drop__drop-zone text-center border border-dashed border-primary bg-[#F8FAFF] p-4">
//                             <div {...getRootProps({className: 'dropzone-two'})}>
//                                 <input {...getInputProps()} />
//                                 {productImage ? (
//                                 <img src={productImage} alt="Selected" className="preview-image"/>
//                                 ) : (
//                                     <>
//                                         <h3>Drop product image here</h3>
//                                         <h1>or</h1>

//                                         <button type="submit" className="inventual-btn">Browse File</button>
//                                         <p>Allowed JPEG, JPG & PNG FORMAT | Max 100 mb</p>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                     <div className="inventual-add-product-content mt-7">
//                         <div className='inventual-checkbox-style mb-2'>
//                             <FormControlLabel
//                                 control={<Checkbox 
//                                 checked={feature} 
//                                 onChange={(e) => setFeature(e.target.checked)} 
//                                 inputProps={{ 'aria-label': 'controlled' }} />}
//                                 label="Add Featured"
//                             />
//                         </div>
//                         <span className="block text-[14px] italic mb-7">This product will be displayed in POS</span>
//                         <div className='inventual-checkbox-style mb-5'>
//                             <FormControlLabel
//                                 control={<Checkbox 
//                                 checked={expired} 
//                                 onChange={(e) => setExpired(e.target.checked)} 
//                                 inputProps={{ 'aria-label': 'controlled' }} />}
//                                 label="This product has date expired"
//                             />
//                         </div>
//                         <div className='inventual-checkbox-style mb-5'>
//                             <FormControlLabel
//                                 control={<Checkbox
//                                 checked={sale} 
//                                 onChange={(e) => setSale(e.target.checked)}     
//                                 inputProps={{ 'aria-label': 'controlled' }} />}
//                                 label="Add Promotional Sale"
//                             />
//                         </div>
//                         <div className="inventual-submit-btn pt-2.5">
//                             <button type="submit" className="inventual-btn">Create Product</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AddProduct;