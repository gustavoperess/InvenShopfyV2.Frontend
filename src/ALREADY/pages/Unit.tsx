// import {useRef, useState} from "react";
// import * as React from "react";
// import {Button, Form, Pagination, Table, Dropdown, Modal} from "react-bootstrap";
// import SideBarComponent from "../../../Components/SideBar/SideBarComponent";
// import NavbarComponent from "../../../Components/NavBar/NavarComponent";
// import PageIndicatorComponent from "../../../Components/PageIndicator/PageIndicatorComponent";
// import {useGetAllProductsUnitQuery, useAddUnitMutation, useDeleteUnitMutation} from "../../../Services/Product/Unit";


// export const ProductUnitPage = () => {
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const formRef = useRef<HTMLFormElement>(null);
//     const [show, setShow] = useState<boolean | false>(false);
//     const [title, setTitle] = useState<string>("");
//     const [shortName, setShortName] = useState<string>("");
//     const {data: unitData, error, isLoading, refetch } = useGetAllProductsUnitQuery(currentPage);
//     const [addUnit] = useAddUnitMutation();
//     const [unitToDelete, setUnitToDelete] = useState<number>(0);
//     const [deleteUnit] = useDeleteUnitMutation();

//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const ct = { title, shortName };
//         try {
//             await addUnit(ct).unwrap();
//             setTitle('');
//             setShortName('');
//             formRef.current?.reset();
//             console.log("Unit added successfully");
//             refetch();
//         } catch (e) {
//             console.log("Error occurred while adding a unit", e);
//         }
//     };


//     let paginationItems = [];
//     for (let number = 1; number <= unitData?.totalPages; number++) {
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

//     const handleShortNamechange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setShortName(e.target.value)
//     }

//     const confirmDelete = (unittId: number) => {
//         setUnitToDelete(unittId);
//         setShow(true);
//       };
      
//       const handleDelete = async () => {
//         if (unitToDelete > 0){
//           try {
//             await deleteUnit(unitToDelete);
//             setShow(false); 
//             refetch()
//           } catch (err) {
//             console.error('Error deleting the unit:', err);
//           }
//         }
//       };



//     if (error) return <div>Error loading data</div>;
//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <div className="dashboard-container">
//             <div className="sidebar">
//                 <SideBarComponent />
//             </div>
//             <div className="main-content">
//                 <div className="header">
//                     <NavbarComponent />
//                     <PageIndicatorComponent title="Products" subtitle="Unit" />
//                 </div>
//                 <div className="main-form">
//                     <div className="add-category">
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group className="form-col-100" controlId="formUnitName">
//                                 <Form.Label>Name</Form.Label>
//                                 <Form.Control type="text" placeholder="Killogram" value={title} onChange={handleTitleChange} />
//                             </Form.Group>
//                             <Form.Group className="form-col-100" controlId="formUnitShortName">
//                                 <Form.Label>Short Name</Form.Label>
//                                 <Form.Control type="text" placeholder="kg" value={shortName} onChange={handleShortNamechange} />
//                             </Form.Group>
//                             <div className="button-container">
//                                 <Button variant="primary" type="submit">
//                                     Create Unit
//                                 </Button>
//                             </div>
//                         </Form>
//                     </div>
//                     <div className="category-list">
//                         <Table striped bordered hover>
//                             <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Short Name</th>
//                                 <th>Action</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {unitData?.data.map((unit: any) => (
//                                 <tr key={unit.id}>
//                                     <td>{unit?.title}</td>
//                                     <td>{unit?.shortName}</td>
//                                     <td>
//                                     <Dropdown>
//                                         <Dropdown.Toggle variant="success" id="dropdown-basic">
//                                             Action
//                                         </Dropdown.Toggle>
//                                         <Dropdown.Menu>
//                                             <Dropdown.Item href="#/action-1">Edit Product</Dropdown.Item>
//                                             <Dropdown.Divider />
//                                             <Dropdown.Item onClick={() => confirmDelete(unit.id)}>Delete</Dropdown.Item>
//                                         </Dropdown.Menu>
//                                     </Dropdown>
//                                     </td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </Table>
//                         <div className="pagination-class">
//                             <Pagination size="sm">
//                                 <Pagination.First onClick={() => handlePageChange(1)}/>
//                                 <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))}/>
//                                 {paginationItems}
//                                 <Pagination.Next onClick={() => handlePageChange(Math.min(unitData?.totalPages, currentPage + 1))} />
//                                 <Pagination.Last onClick={() => handlePageChange(unitData?.totalPages)} />
//                             </Pagination>
//                         </div>
//                         <Modal show={show} onHide={() => setShow(false)}>
//                             <Modal.Header closeButton>
//                             <Modal.Title>Delete Confirmation</Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>Are you sure you want to delete this Unit?</Modal.Body>
//                             <Modal.Footer>
//                             <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
//                             <Button variant="danger" onClick={handleDelete}>Delete</Button>
//                             </Modal.Footer>
//                         </Modal>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }