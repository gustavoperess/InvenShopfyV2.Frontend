// import { useGetBestSellerQuery } from "../../../Services/Sales/Sales";
// import ListGroup from 'react-bootstrap/ListGroup';
// import Badge from 'react-bootstrap/Badge';

// const BestSellerComponent: React.FC = () => {
//     const { data: bestSellerData, error: bestSellerError, isLoading: bestSellerLoading } = useGetBestSellerQuery();

//     if (bestSellerLoading) return <div>Loading...</div>;
//     if (bestSellerError) return <div>Error loading data</div>;
    
//     const date = new Date();
//     const monthName = date.toLocaleString('default', { month: 'long' });


//     return (
//         <>
//             <h5>Top Seller {monthName}</h5>
//             <ListGroup as="ol">
//                 {bestSellerData?.data.map((product: any, index: number) => (
//                     <ListGroup.Item 
//                         as="li" 
//                         key={product.Id || index} 
//                         className="d-flex justify-content-between align-items-start">
//                         <div className="ms-2 me-auto">
//                             <div className="fw-bold">{index + 1}. {product.productName}</div>
//                             [{product.productCode}]
//                         </div>
//                         <Badge bg="primary" pill>
//                             {product.totalQuantitySoldPerProduct}
//                         </Badge>
//                     </ListGroup.Item>
//                 ))}
//             </ListGroup>
//         </>
//     );
// };

// export default BestSellerComponent;