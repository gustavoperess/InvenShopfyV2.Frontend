// import SideBarComponent from "../../../Components/SideBar/SideBarComponent";
// import NavbarComponent from "../../../Components/NavBar/NavarComponent";
// import PageIndicatorComponent from "../../../Components/PageIndicator/PageIndicatorComponent";
// import {Button, Form, Pagination, Table, Modal, Dropdown} from "react-bootstrap";
// import {Accept, useDropzone} from "react-dropzone";
// import {useCallback, useRef, useState} from "react";
// import {useAddBrandMutation, useGetAllProductsBrandQuery, useDeleteBrandMutation} from "../../../Services/Product/Brand";


// export const ProductBrandPage = () => {
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [brandImage, setBrandImage] = useState<string | null>(null);
//     const [title, setTitle] = useState<string>("");
//     const [show, setShow] = useState<boolean | false>(false);
//     const [brandToDelete, setBrandToDelete] = useState<number>(0);
//     const [deleteBrand] = useDeleteBrandMutation();
//     const formRef = useRef<HTMLFormElement>(null);
//     const [addBrand] = useAddBrandMutation();
//     const {data: productBrandData, error, isLoading, refetch } = useGetAllProductsBrandQuery(currentPage);

//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const brandData = { title, brandImage };
//         console.log(brandData)
//         try {
//             await addBrand(brandData).unwrap();
//             setTitle('');
//             setBrandImage(null);
//             formRef.current?.reset();
//             console.log("Product added successfully");
//             refetch();
//         } catch (e) {
//             console.log("Error occurred while adding a Brand", e);
//         }
//     };

//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         if (acceptedFiles.length > 0) {
//             const file = acceptedFiles[0]; 
//             const reader = new FileReader();
            
//             reader.onloadend = () => {
//                 const base64String = reader.result as string; // Cast to string
//                 setBrandImage(base64String); // Store Base64 string instead of File object
//             };
            
//             reader.readAsDataURL(file); // Read the file as Data URL (Base64)
//         }
//     }, []);

//     const accept: Accept = {
//         'image/*': []
//     };
//     const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });
//     let paginationItems = [];
//     for (let number = 1; number <= productBrandData?.totalPages; number++) {
//         paginationItems.push(
//             <Pagination.Item
//                 key={number}
//                 active={number === currentPage}
//                 onClick={() => handlePageChange(number)}
//             >
//                 {number}
//             </Pagination.Item>
//         );
//     }
//     const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setTitle(e.target.value)
//     }

//     const confirmDelete = (brandId: number) => {
//         setBrandToDelete(brandId);
//         setShow(true);
//       };
      
//       const handleDelete = async () => {
//         if (brandToDelete > 0){
//           try {
//             await deleteBrand(brandToDelete);
//             setShow(false); 
//             refetch()
//           } catch (err) {
//             console.error('Error deleting the category:', err);
//           }
//         }
//       };

//     if (error) return <div>Error loading data</div>;
//     if (isLoading) return <div>Loading...</div>;

//     return (
//             <div className="dashboard-container">
//             <div className="sidebar">
//             <SideBarComponent />
//             </div>
//         <div className="main-content">
//             <div className="header">
//                 <NavbarComponent />
//                 <PageIndicatorComponent title="Products" subtitle="Brand" />
//             </div>
//             <div className="main-form">
//                 <div className="add-category">
//                     <Form onSubmit={handleSubmit}>
//                         <div className="form-row-dropzone">
//                             <div {...getRootProps({ className: 'dropzone' })}>
//                                 <input {...getInputProps()} />
//                                 {brandImage ? (
//                                      <img src={brandImage} alt="Selected" className="preview-image"/>
//                                 ) : (
//                                     <p>Drag 'n' drop an image here, or click to select one</p>
//                                 )}
//                             </div>
//                         </div>
//                         <Form.Group className="form-col-100" controlId="formProductName">
//                             <Form.Label>Brand Name</Form.Label>
//                             <Form.Control type="text" placeholder="Apple" value={title} onChange={handleTitleChange} />
//                         </Form.Group>
//                         <div className="button-container">
//                             <Button variant="primary" type="submit">
//                                 Create Brand
//                             </Button>
//                         </div>
//                     </Form>
//                 </div>
//                 <div className="category-list">
//                     <Table striped bordered hover>
//                         <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Brand Name</th>
//                             <th>Action</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {productBrandData?.data.map((brand: any) => (
//                             <tr key={brand.id}>
//                              <td><img src={brand?.brandImage == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : brand?.brandImage}  className='imageList' /></td>
//                                 <td>{brand?.title}</td>
//                                 <td>
//                                     <Dropdown>
//                                         <Dropdown.Toggle variant="success" id="dropdown-basic">
//                                             Action
//                                         </Dropdown.Toggle>
//                                         <Dropdown.Menu>
//                                             <Dropdown.Item href="#/action-1">Edit Product</Dropdown.Item>
//                                             <Dropdown.Divider />
//                                             <Dropdown.Item onClick={() => confirmDelete(brand.id)}>Delete</Dropdown.Item>
//                                         </Dropdown.Menu>
//                                     </Dropdown>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </Table>
//                     <div className="pagination-class">
//                         <Pagination size="sm">
//                             <Pagination.First onClick={() => handlePageChange(1)}/>
//                             <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))}/>
//                             {paginationItems}
//                             <Pagination.Next onClick={() => handlePageChange(Math.min(productBrandData?.totalPages, currentPage + 1))} />
//                             <Pagination.Last onClick={() => handlePageChange(productBrandData?.totalPages)} />
//                         </Pagination>
//                     </div>
//                     <Modal show={show} onHide={() => setShow(false)}>
//                             <Modal.Header closeButton>
//                             <Modal.Title>Delete Confirmation</Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>Are you sure you want to delete this Brand?</Modal.Body>
//                             <Modal.Footer>
//                             <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
//                             <Button variant="danger" onClick={handleDelete}>Delete</Button>
//                             </Modal.Footer>
//                     </Modal>
//                 </div>
//             </div>
//         </div>
//     </div>
//     );
// }