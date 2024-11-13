"use client"
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useGetPurchaseTotalAmountQuery } from "@/services/Purchase/Purchase";
import { useGetTotalSalesAmountQuery } from "@/services/Sales/Sales";
import { useGetExpenseTotalAmountQuery } from '@/services/Expense/Expense';
import { useGetTotalProfitDashboardQuery } from '@/services/Sales/Sales';
import { useMemo } from 'react';


const options: any = {
  chart: {
    type: "pie",
    width: "100%"
  },
  legend: {
    show: true,
    fontSize: '14px',
    fontFamily: 'Nunito Sans, Arial',
    fontWeight: 400,
    labels: {
      colors: undefined,
      useSeriesColors: false
    },
    markers: {
      width: 30,
      height: 15,
      strokeWidth: 0,
      strokeColor: '#fff',
      fillColors: undefined,
      radius: 3,
      offsetX: -3,
      offsetY: 2
    },
    itemMargin: {
      horizontal: 5,
      vertical: 3
    },
  },
  labels: ["Purchase", "Sales", "Expense", "Gross Profit"],
  responsive: [
    {
      breakpoint: 2000,
      options: {
        chart: {
          width: 350
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          itemMargin: {
            horizontal: 5,
            vertical: 0
          },
        }
      }
    },
    {
      breakpoint: 400,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: "bottom"
        }
      }
    },
    {
      breakpoint: 350,
      options: {
        chart: {
          width: 280
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};


const ReportPicChart = () => {
  const { data: totalSalesAmountData, isLoading: totalSalesAmountLoadingData } = useGetTotalSalesAmountQuery();
  const { data: expenseTotalAmountData, isLoading: expenseTotalLoadingData } = useGetExpenseTotalAmountQuery();
  const { data: purchaseTotalAmountData, isLoading: purchaseTotalAmountLoadingData } = useGetPurchaseTotalAmountQuery();
  const { data: totalProfitData, isLoading: totalProfitLoadingData } = useGetTotalProfitDashboardQuery();


  const series = useMemo(() => {
    if (
      !totalSalesAmountLoadingData && 
      !expenseTotalLoadingData && 
      !purchaseTotalAmountLoadingData && 
      !totalProfitLoadingData
    ) {
      return [
        purchaseTotalAmountData?.data || 0,
        totalSalesAmountData?.data || 0,
        expenseTotalAmountData?.data || 0,
        totalProfitData?.data || 0
      ];
    }
    return [0, 0, 0, 0]; 
  }, [
    expenseTotalAmountData, 
    totalSalesAmountData, 
    purchaseTotalAmountData, 
    totalProfitData,
    totalSalesAmountLoadingData, 
    expenseTotalLoadingData, 
    purchaseTotalAmountLoadingData, 
    totalProfitLoadingData
  ]);
  return (
    <div >
          <ApexCharts options={options} series={series} type="pie" width={380} height={300} />
    </div>
  );
};

export default ReportPicChart;
