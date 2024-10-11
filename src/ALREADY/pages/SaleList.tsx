// import { Table, Pagination, Button, Modal, Dropdown } from 'react-bootstrap';
// import SideBarComponent from "../../../Components/SideBar/SideBarComponent";
// import NavbarComponent from "../../../Components/NavBar/NavarComponent";
// import PageIndicatorComponent from "../../../Components/PageIndicator/PageIndicatorComponent";
// import { useState } from 'react';
// import { useDeleteSaleMutation, useGetAllSalesQuery } from '../../../Services/Sales/Sales';



// export const SaleListPage = () => {
//     const [currentPage, setCurrentPage] = useState<number>(1);  // Managing current page number
//     const [product, setProduct] = useState<number>(0);
//     const [show, setShow] = useState<boolean | false>(false);
//     const [deleteProduct] = useDeleteSaleMutation();
//     const { data: salesData, error: salesError, isLoading: salesLoading, refetch } = useGetAllSalesQuery(currentPage);

//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);  // Updating the current page number
//     };

//     if (salesError) return <div>Error loading data</div>;
//     if (salesLoading) return <div>Loading...</div>;




//     let paginationItems = [];
//     for (let number = 1; number <= salesData?.totalPages; number++) {
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

//     const confirmDelete = (brandId: number) => {
//         setProduct(brandId);
//         setShow(true);
//       };
      
//       const handleDelete = async () => {
//         if (product > 0){
//           try {
//             await deleteProduct(product);
//             setShow(false); 
//             refetch()
//           } catch (err) {
//             console.error('Error deleting the category:', err);
//           }
//         }
//       };

//       console.log(salesData)
  
 
//     return (
//         <div className="dashboard-container">
//         <div className="sidebar">
//             <SideBarComponent />
//         </div>
//         <div className="main-content">
//             <div className="header">
//                 <NavbarComponent />
//                 <PageIndicatorComponent title="Sale" subtitle="List" />
//             </div>
//             <div className="product-list">
//                 <Table striped bordered hover>
//                     <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Reference</th>
//                         <th>Customer</th>
//                         <th>Warehouse</th>
//                         <th>Status</th>
//                         <th>Biller</th>
//                         <th>Payment status</th>
//                         <th>Total</th>
//                         <th>Discount</th>
//                         <th>Quantity</th>
//                         <th>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {salesData?.data.map((sale: any) => (
//                         <tr key={sale.id}>
//                             <td>{sale.saleDate.split("T")[0]}</td>
//                             <td>{sale.referenceNumber}</td>
//                             <td>{sale.customerName}</td>
//                             <td>{sale.warehouseName}</td>
//                             <td>{sale.saleStatus}</td>
//                             <td>{sale.billerName}</td>
//                             <td>{sale.paymentStatus}</td>
//                             <td>${sale.totalAmount}</td>
//                             <td>{sale.discount}%</td>
//                             <td>{sale.totalQuantitySold}</td>
//                             <td>
//                                 <Dropdown>
//                                     <Dropdown.Toggle variant="success" id="dropdown-basic">
//                                         Action
//                                     </Dropdown.Toggle>
//                                     <Dropdown.Menu>
//                                         <Dropdown.Item href="#/action-1">Edit Product</Dropdown.Item>
//                                         <Dropdown.Divider />
//                                         <Dropdown.Item onClick={() => confirmDelete(sale.id)}>Delete</Dropdown.Item>
//                                     </Dropdown.Menu>
//                                 </Dropdown>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </Table>

//                 {/* Render pagination */}
//                 <div className="pagination-class">
//                     <Pagination size="sm">
//                         <Pagination.First onClick={() => handlePageChange(1)} />
//                         <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
//                         {paginationItems}  {/* Page Numbers */}
//                         <Pagination.Next onClick={() => handlePageChange(Math.min(salesData?.totalPages, currentPage + 1))} />
//                         <Pagination.Last onClick={() => handlePageChange(salesData?.totalPages)} />
//                     </Pagination>
//                 </div>
//                 <Modal show={show} onHide={() => setShow(false)}>
//                         <Modal.Header closeButton>
//                         <Modal.Title>Delete Confirmation</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>Are you sure you want to delete this Brand?</Modal.Body>
//                         <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
//                         <Button variant="danger" onClick={handleDelete}>Delete</Button>
//                         </Modal.Footer>
//                 </Modal>
//             </div>
//         </div>
//     </div>
//     )
// }