// import { Table, Pagination, Button, Modal, Dropdown } from 'react-bootstrap';
// import SideBarComponent from "../../../Components/SideBar/SideBarComponent";
// import NavbarComponent from "../../../Components/NavBar/NavarComponent";
// import PageIndicatorComponent from "../../../Components/PageIndicator/PageIndicatorComponent";
// import { useState } from 'react';
// import { useGetAllPurchasesQuery, useDeletePurchaseMutation } from '../../../Services/Purchase/Purchase';



// export const PurchaseListPage = () => {
//     const [currentPage, setCurrentPage] = useState<number>(1);  // Managing current page number
//     const [purchase, setPurchase] = useState<number>(0);
//     const [show, setShow] = useState<boolean | false>(false);
//     const [deletePurchase] = useDeletePurchaseMutation();
//     const { data: purchaseData, error: purchaseError, isLoading: purchaseLoading, refetch } = useGetAllPurchasesQuery(currentPage);

//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);  // Updating the current page number
//     };

//     if (purchaseError) return <div>Error loading data</div>;
//     if (purchaseLoading) return <div>Loading...</div>;




//     let paginationItems = [];
//     for (let number = 1; number <= purchaseData?.totalPages; number++) {
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
//         setPurchase(brandId);
//         setShow(true);
//       };
      
//       const handleDelete = async () => {
//         if (purchase > 0){
//           try {
//             await deletePurchase(purchase);
//             setShow(false); 
//             refetch()
//           } catch (err) {
//             console.error('Error deleting the category:', err);
//           }
//         }
//       };

//       console.log(purchaseData)
  
 
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
//                         <th>Supplier</th>
//                         <th>Warehouse</th>
//                         <th>Status</th>
//                         <th>Number of Products Bought</th>
//                         <th>Shipping Cost</th>
//                         <th>Total Amount</th>
//                         <th>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {purchaseData?.data.map((purchase: any) => (
//                         <tr key={purchase.id}>
//                             <td>{purchase.purchaseDate.split("T")[0]}</td>
//                             <td>{purchase.referenceNumber}</td>
//                             <td>{purchase.supplierName}</td>
//                             <td>{purchase.warehouseName}</td>
//                             <td>{purchase.purchaseStatus}</td>
//                             <td>{purchase.totalNumberOfProductsBought}</td>
//                             <td>{purchase.shippingCost}</td>
//                             <td>${purchase.totalAmountBought}</td>
//                             <td>
//                                 <Dropdown>
//                                     <Dropdown.Toggle variant="success" id="dropdown-basic">
//                                         Action
//                                     </Dropdown.Toggle>
//                                     <Dropdown.Menu>
//                                         <Dropdown.Item href="#/action-1">Edit Product</Dropdown.Item>
//                                         <Dropdown.Divider />
//                                         <Dropdown.Item onClick={() => confirmDelete(purchase.id)}>Delete</Dropdown.Item>
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
//                         <Pagination.Next onClick={() => handlePageChange(Math.min(purchaseData?.totalPages, currentPage + 1))} />
//                         <Pagination.Last onClick={() => handlePageChange(purchaseData?.totalPages)} />
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