import { Table, Pagination, Button, Modal, Dropdown } from 'react-bootstrap';
import NavbarComponent from "../../Components/NavBar/NavarComponent";
import PageIndicatorComponent from "../../Components/PageIndicator/PageIndicatorComponent";
import SideBarComponent from '../../Components/SideBar/SideBarComponent';
import { useState } from 'react';
import { useGetAllWarehousesQuery, useDeleteWarehouseMutation } from '../../Services/Warehouse/Warehouse';



export const WarehousePage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);  // Managing current page number
    const [warehouse, setWarehouse] = useState<number>(0);
    const [show, setShow] = useState<boolean | false>(false);
    const [deleteWarehouse] = useDeleteWarehouseMutation();
    const { data: warehouseData, error: warehouseError, isLoading: warehouseLoading, refetch } = useGetAllWarehousesQuery(currentPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);  // Updating the current page number
    };

    if (warehouseError) return <div>Error loading data</div>;
    if (warehouseLoading) return <div>Loading...</div>;




    let paginationItems = [];
    for (let number = 1; number <= warehouseData?.totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    const confirmDelete = (warehouseId: number) => {
        setWarehouse(warehouseId);
        setShow(true);
      };
      
      const handleDelete = async () => {
        if (warehouse > 0){
          try {
            await deleteWarehouse(warehouse);
            setShow(false); 
            refetch()
          } catch (err) {
            console.error('Error deleting the category:', err);
          }
        }
      };

      console.log(warehouseData)
  
 
    return (
        <div className="dashboard-container">
        <div className="sidebar">
            <SideBarComponent />
        </div>
        <div className="main-content">
            <div className="header">
                <NavbarComponent />
                <PageIndicatorComponent title="Warehouse" subtitle="" />
            </div>
            <div className="product-list">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>SL</th>
                        <th>Warehouse</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                
                    </tr>
                    </thead>
                    <tbody>
                    {warehouseData?.data.map((warehouse: any) => (
                        <tr key={warehouse.id}>
                            <td>{warehouse.id}</td>
                            <td>{warehouse.warehouseName}</td>
                            <td>{warehouse.phoneNumber}</td>
                            <td>{warehouse.email}</td>
                            <td>{warehouse.address}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Action
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Edit warehouse</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={() => confirmDelete(warehouse.id)}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                {/* Render pagination */}
                <div className="pagination-class">
                    <Pagination size="sm">
                        <Pagination.First onClick={() => handlePageChange(1)} />
                        <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
                        {paginationItems}  {/* Page Numbers */}
                        <Pagination.Next onClick={() => handlePageChange(Math.min(warehouseData?.totalPages, currentPage + 1))} />
                        <Pagination.Last onClick={() => handlePageChange(warehouseData?.totalPages)} />
                    </Pagination>
                </div>
                <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this Brand?</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        </Modal.Footer>
                </Modal>
            </div>
        </div>
    </div>
    )
}