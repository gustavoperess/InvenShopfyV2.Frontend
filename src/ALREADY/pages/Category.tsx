import SideBarComponent from "../../../Components/SideBar/SideBarComponent";
import NavbarComponent from "../../../Components/NavBar/NavarComponent";
import PageIndicatorComponent from "../../../Components/PageIndicator/PageIndicatorComponent";
import { Pagination, Table, Modal,  Form, Button, Dropdown  } from "react-bootstrap";
import { useGetAllProductsCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation } from "../../../Services/Product/Category";
import "./CategoryProduct.css";
import { useState, useCallback, useRef } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

export const CategoryProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [mainCategory, setMainCategory] = useState<string>("");
    const [subCategory, setSubCategory] = useState<string>("");
    const [show, setShow] = useState<boolean | false>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [addCategory] = useAddCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const { data: categoriesData, error: categoriesDataError, isLoading: categoriesDataLoading, refetch } = useGetAllProductsCategoryQuery(currentPage);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const subCategoryArray = subCategory.split(',').map((item) => item.trim());

        const ct = { mainCategory, subCategory: subCategoryArray };
        try {
            await addCategory(ct).unwrap();
            setMainCategory('');
            setSubCategory('');
            setSelectedImage(null);
            formRef.current?.reset();
            console.log("Product added successfully");
            refetch();
        } catch (e) {
            console.log("Error occurred while adding a category", e);
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedImage(acceptedFiles[0]);
    }, []);

    const accept: Accept = {
        'image/*': []
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMainCategory(e.currentTarget.value);
    };

    const handleSubCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubCategory(e.currentTarget.value);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

    let paginationItems = [];
    for (let number = 1; number <= categoriesData?.totalPages; number++) {
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

    const confirmDelete = (categoryId: number) => {
        setCategoryToDelete(categoryId);
        setShow(true);
      };
      
      const handleDelete = async () => {
        if (categoryToDelete > 0){
          try {
            await deleteCategory(categoryToDelete);
            setShow(false); 
            refetch()
          } catch (err) {
            console.error('Error deleting the category:', err);
          }
        }
      };




    if (categoriesDataError) return <div>Error loading data</div>;
    if (categoriesDataLoading) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <SideBarComponent />
            </div>
            <div className="main-content">
                <div className="header">
                    <NavbarComponent />
                    <PageIndicatorComponent title="Products" subtitle="List" />
                </div>
                <div className="main-form">
                    <div className="add-category">
                        <Form onSubmit={handleSubmit}>
                            <div className="form-row-dropzone">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    {selectedImage ? (
                                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="preview-image" />
                                    ) : (
                                        <p>Drag 'n' drop an image here, or click to select one</p>
                                    )}
                                </div>
                            </div>
                            <Form.Group className="form-col-100" controlId="formProductName">
                                <Form.Label>Main Category</Form.Label>
                                <Form.Control type="text" placeholder="Clothing" value={mainCategory} onChange={handleCategoryChange} />
                            </Form.Group>
                            <Form.Group className="form-col-100" controlId="formSubCategory">
                                <Form.Label>Sub-Category</Form.Label>
                                <Form.Control type="text"  placeholder="e.g., Nike Shoes, Adidas Sneakers"  value={subCategory} onChange={handleSubCategoryChange} />
                            </Form.Group>
                            <div className="button-container">
                                <Button variant="primary" type="submit">
                                    Create Category
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="category-list">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Sub-Category</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categoriesData?.data.map((category: any) => (
                                <tr key={category.id}>
                                    <td>{category?.mainCategory}</td>
                                    <td>{Array.isArray(category?.subCategory) ? category.subCategory.join(', ') : category?.subCategory}</td>
                                    <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Action
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Edit Product</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={() => confirmDelete(category.id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <div className="pagination-class">
                            <Pagination size="sm">
                                <Pagination.First onClick={() => handlePageChange(1)}/>
                                <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))}/>
                                {paginationItems}
                                <Pagination.Next onClick={() => handlePageChange(Math.min(categoriesData?.totalPages, currentPage + 1))} />
                                <Pagination.Last onClick={() => handlePageChange(categoriesData?.totalPages)} />
                            </Pagination>
                        </div>
                        <Modal show={show} onHide={() => setShow(false)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Delete Confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this Category?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDelete}>Delete</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};