import { useState, useEffect, useRef } from "react";

import SideBarComponent from "../../../Components/SideBar/SideBarComponent";
import NavbarComponent from "../../../Components/NavBar/NavarComponent";
import PageIndicatorComponent from "../../../Components/PageIndicator/PageIndicatorComponent";
import {Form, Button, Table }from 'react-bootstrap';
import "./Sales.css"
import { useGetAllBillersQuery } from "../../../Services/People/Biller";
import { useGetAllCustomersQuery } from "../../../Services/People/Customer";
import { useCreateSaleMutation } from "../../../Services/Sales/Sales";
import {useGetProductByNameQuery} from "../../../Services/Product/Products";
import { useGetAllWarehousesQuery } from "../../../Services/Warehouse/Warehouse";


function useDebounce(value: string, delay : number) {
    const [debouncedValue, setDebouncedValue] = useState(value); 

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}
 
export const SalesPage = () => {
    const [SaleDate, setSaleDate] = useState<string>("");
    const [customerId, setCustomer] = useState<number | null>();
    const [warehouseId, setWarehouse] = useState<number | null>();
    const [billerId, setBiller] = useState<number | null>();
    const [discount, setDiscount] = useState<number>(0);
    const [product, setProduct] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productInformation, setProductInformation] = useState<Array<{ 
        id: number; 
        title: string; 
        productImage: string; 
        category: string;
        productCode: number,
        stockQuantity: number,
        subcategory: string,
        price: number;
        quantitySold: number;
        totalAmountSold: number, 
    }>>([]);
    const [shippingCost, setShippingCost] = useState<number>(0);
    const [saleStatus, setSalesStatus] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
    const [saleNote, setSaleNote] = useState<string>("");
    const [staffNote, setStaffNote] = useState<string>("");
    const debouncedSearchTerm = useDebounce(productName, 500);
    const formRef = useRef<HTMLFormElement>(null);
    const [addSale] = useCreateSaleMutation();
    const [suggestions, setSuggestions] = useState<Array<{ 
            id: number; 
            title: string; 
            productImage: string; 
            category: string;
            productCode: number,
            stockQuantity: number,
            subcategory: string,
            price: number;
        }>>([]);
    const { data : warehousesData } = useGetAllWarehousesQuery(1);
    const {data: customerData} = useGetAllCustomersQuery(1);
    const {data : billerData} = useGetAllBillersQuery(1);

    const { data: productSuggestionsData, error } = useGetProductByNameQuery(debouncedSearchTerm, { 
        skip: debouncedSearchTerm.trim().length === 0  // Only call API if debounced term is not empty
    });


    useEffect(() => {
        if (debouncedSearchTerm.trim().length > 0 && productSuggestionsData) {
            setSuggestions(productSuggestionsData.data);  
        } else {
            setSuggestions([]);  
        }
    
        // Handle error scenarios
        if (error) {
            console.error("Error fetching product suggestions", error);
            // You could display a user-friendly message if needed
        }
    }, [debouncedSearchTerm, productSuggestionsData, error]);

    useEffect(() => {
        if (billerData && billerData.data.length > 0 && !billerId) {
            setBiller(billerData.data[0].id);
        }
        if (warehousesData && warehousesData.data.length > 0 && !warehouseId) {
            setWarehouse(warehousesData.data[0].id);
        }
        if (customerData && customerData.data.length > 0 && !customerId) {
            setCustomer(customerData.data[1].id);
        }

    }, [billerData, billerId, warehousesData, warehouseId, customerData, customerId]);

    const handleSubmit  = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let productIdPlusQuantity: { [key: number]: number } = {};
        productInformation.forEach(product => {
            productIdPlusQuantity[product.id] = product.quantitySold; 
        });
        
        console.log(saleStatus)
        const saleData = { 
            SaleDate, 
            customerId, 
            warehouseId, 
            billerId, 
            productIdPlusQuantity, 
            saleStatus, 
            saleNote, 
            staffNote, 
            paymentStatus, 
            shippingCost, 
            discount,
            TotalAmount
        };
        try {
            await addSale(saleData).unwrap();
            setShippingCost(0);
            setDiscount(0);
            setSaleNote("");
            setStaffNote("");
            formRef.current?.reset();
        }catch(error) {
            console.error("Error submitting the form", error);
        }

    }

    const customerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectCustomerId = Number(e.target.value);
        setCustomer(selectCustomerId);
    }

    const warehouseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectWarehouseById = Number(e.target.value);
        setWarehouse(selectWarehouseById);
    }

    const billerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectBillerId = Number(e.target.value);
        setBiller(selectBillerId);
    }

    const onTypeChangeForProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProduct(value);
        setProductName(value);
    };

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSaleDate(e.target.value)
    }

    const selectSuggestion = (suggestion: { 
        id: number; 
        title: string; 
        productImage: string; 
        category: string;
        productCode: number,
        stockQuantity: number,
        subcategory: string,
        price: number;
        }) => {
        const existingProductIndex = productInformation.findIndex(product => product.title === suggestion.title);
        if (existingProductIndex != -1) {
            setProductInformation(prev => {
                const updateProducts = prev.map((product, index) => {
                    if (index === existingProductIndex && product.stockQuantity > 0) {
                        return {
                            ...product,
                                stockQuantity: product.stockQuantity - 1,
                                quantitySold: product.quantitySold + 1,
                                totalAmountSold: product.totalAmountSold  + product.price
                        };
                    }
                    return product
                });
                return updateProducts
            });
        } else {
            setProductInformation(prev => [...prev, {...suggestion, quantitySold: 1, totalAmountSold: suggestion.price}]);
        }
 
        // setImage(suggestion.productImage);
        setSuggestions([]);
        setProduct("");
    };
   
    const shippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectShippingPrice = Number(e.target.value);
        setShippingCost(selectShippingPrice);
    }
    const saleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectSaleStatusId = (e.target.value);
        console.log(e.target)
        setSalesStatus(selectSaleStatusId);
    }
    const paymentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectSaleStatusId = (e.target.value);
        setPaymentStatus(selectSaleStatusId);
    }
    const salesNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSaleNote(e.target.value);
    };
    const staffNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStaffNote(e.target.value);
    };

    const discountChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const selectDiscountId = Number(e.target.value);
        setDiscount(selectDiscountId);
    };

    const handleRemoveProduct = (productId: number) => {
        setProductInformation((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };


    let productSum = (productInformation.reduce((acumulator, current) => acumulator + current.totalAmountSold, 0))
    let totalNumberOfProducts = (productInformation.reduce((acumulator, current) => acumulator + current.quantitySold, 0))
    let TotalAmount = productSum + shippingCost 
    let totalSumAfterDiscount = Math.round(TotalAmount * discount/100)
    TotalAmount = TotalAmount - totalSumAfterDiscount
 
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <SideBarComponent/>
            </div>
            <div className="main-content">
                <div className="header">
                    <NavbarComponent/>
                    <PageIndicatorComponent title="New Sale" subtitle="Sale"/>
                </div>
                <div className="container-main">
                        <div className="product-list">
                            <Form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <Form.Group className="form-col-20" onChange={onDateChange} controlId="formSaleDate">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                        <Form.Group className="form-col-20" controlId="formCustomer">
                                            <Form.Label>Select Customer</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={customerChange} value={customerId || ""}>
                                                {customerData && customerData.data.map((customer: {id: number,name: string}) => (
                                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="form-col-20" controlId="formWarehouse">
                                            <Form.Label>Select Warehouse</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={warehouseChange}   value={warehouseId || ""}>
                                                {warehousesData && warehousesData.data.map((warehouse: {id: number, warehouseName: string}) => (
                                                    <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouseName}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="form-col-20" controlId="formBiller">
                                        <Form.Label>Select Biller</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={billerChange}value={billerId || ""}>
                                            {billerData && billerData.data.map((biller: { id: number, name: string }) => (
                                                <option key={biller.id} value={biller.id}>{biller.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="form-row">
                                <Form.Group className="form-col-100" controlId="formProductName">
                                    <Form.Label>Product</Form.Label>
                                    <Form.Control 
                                        type="text"  
                                        placeholder="Example: Macbook..." 
                                        value={product} 
                                        onChange={onTypeChangeForProduct} 
                                    />
                                    {suggestions.length > 0 && (
                                        <div className="autocomplete-suggestions">
                                        {suggestions.map((suggestion) => (
                                            <div className="suggestion-item" key={suggestion.id} onClick={() => selectSuggestion(suggestion)}>
                                                 <img src={suggestion?.productImage == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : suggestion?.productImage}  className='imageList' /> {suggestion.title}
                                            </div>
                                        ))}
                                        </div>
                                    )}
                                    </Form.Group>
                                   
                                </div>
                                <div className="form-row">
                                        <Form.Group className="form-col-15" onChange={shippingChange} controlId="formShippingCost">
                                            <Form.Label>Shipping Cost</Form.Label>
                                            <Form.Control type="number"  min="0"/>
                                        </Form.Group>
                                        <Form.Group className="form-col-15" onChange={discountChange} controlId="formDiscount">
                                            <Form.Label>Discount Given</Form.Label>
                                            <Form.Control type="number"  min="0"/>
                                        </Form.Group>
                                        <Form.Group className="form-col-15" onChange={saleStatusChange} controlId="formSaleStatus">
                                            <Form.Label>Sale Status</Form.Label>
                                            <Form.Select aria-label="Default select example">
                                                <option value="Complete">Complete</option>
                                                <option value="Incomplete">Incomplete</option>
                                                <option value="Drafts">Drafts</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="form-col-15" onChange={paymentStatusChange} controlId="formPaymentStatus">
                                            <Form.Label>Payment Status</Form.Label>
                                            <Form.Select aria-label="Default select example">
                                                <option value="Complete">Complete</option>
                                                <option value="Incomplete">Incomplete</option>
                                                <option value="Drafts">Drafts</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="form-col-15" controlId="formDocument">
                                            <Form.Label>Attach Document</Form.Label>
                                            <Form.Control type="file" size="sm" />
                                        </Form.Group>
                                </div>
                                <div className="form-row">
                                <Form.Group className="form-col-50" controlId="formSaleNote">
                                                <Form.Label>Sales Note</Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    rows={3} 
                                                    value={saleNote}
                                                    onChange={salesNoteChange}
                                                />
                                    </Form.Group>
                                    <Form.Group className="form-col-50" controlId="formStaffNote">
                                                <Form.Label>Staff Remark</Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    rows={3} 
                                                    value={staffNote}
                                                    onChange={staffNoteChange}
                                                />
                                    </Form.Group>                  
                                </div>
                           
                            {productInformation.length > 0 && (
                                <div className="selected-products-container">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Image</th>
                                                <th>Product</th>
                                                <th>Code</th>
                                                <th>Category</th>
                                                <th>Sub-Category</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Quantity</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productInformation.map((productInfo) => (
                                                <tr key={productInfo.id}>
                                                    <td>{productInfo.id}</td>
                                                    <td><img src={productInfo?.productImage == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : productInfo?.productImage}  className='imageList' /></td>
                                                    <td>{productInfo.title}</td>
                                                    <td>{productInfo.productCode}</td>
                                                    <td>{productInfo.category}</td>
                                                    <td>{productInfo.subcategory}</td>
                                                    <td>{productInfo.price}</td>
                                                    <td>{productInfo.stockQuantity}</td>
                                                    <td>
                                                        <Form.Control
                                                                type="number"
                                                                min="1"
                                                                value={productInfo.quantitySold}
                                                                onChange={(e) => {
                                                                    const newQuantity = Number(e.target.value);
                                                                    setProductInformation(prev =>
                                                                        prev.map(prod =>
                                                                            prod.id === productInfo.id ? { ...prod, 
                                                                                quantitySold: newQuantity,
                                                                                stockQuantity: prod.stockQuantity > 0 ? prod.stockQuantity - 1 : prod.stockQuantity
                                                                            } : prod
                                                                        )
                                                                    );
                                                                }}
                                                                disabled={productInfo.stockQuantity <= 0}
                                                            />
                                                        </td>
                                                    <td>
                                                    <Button variant="danger" onClick={() => handleRemoveProduct(productInfo.id)}>
                                                        Remove
                                                    </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="total-calculator">
                                        <ul>
                                            <li>Total Amount: ${productSum}</li>
                                            <li>Number of products:{totalNumberOfProducts}</li>
                                            <li>Discount: {discount} %</li>
                                            <li>Shipping:  ${shippingCost}</li>
                                            <li>Grand Total:${TotalAmount}</li>
                                        </ul>
                                    </div>
                                </div>
                                )}
                                 <Button variant="primary" type="submit">
                                Add Sale
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )

}