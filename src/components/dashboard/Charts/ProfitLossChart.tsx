'use client'
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useGetPurchaseTotalAmountQuery } from "@/services/Purchase/Purchase";
import { useGetTotalSalesAmountQuery } from "@/services/Sales/Sales";
import { useGetExpenseTotalAmountQuery } from '@/services/Expense/Expense';
import { useGetTotalProfitDashboardQuery } from '@/services/Sales/Sales';

const options: any = {
  series: [
    {
      name: "Profit",
      data: [7, 9, 13, 11, 14, 6, 9, 7, 13, 15, 11, 20]
    },
    {
      name: "Loss",
      data: [5, 11, 7, 13, 6, 8, 10, 16, 12, 7, 11, 16]
    }
  ],
  chart: {
    height: 380,
    width: "100%", 
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ["#2C6AE5", "#27DB8D"],
  dataLabels: {
    enabled: true
  },
  stroke: {
    curve: "smooth"
  },
  title: {
    text: "Profit & Loss Overview",
    align: "left",
    margin: 0,
    offsetX: 10,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      fontFamily: 'Nunito Sans',
      color: '#263238'
    },
  },
  grid: {
    borderColor: "#f1f1f1",
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  yaxis: {
    min: 4,
    max: 20,
    labels: {
      show: true,
      style: {
        colors: '#616161',
        fontSize: '14px',
        fontFamily: 'Nunito Sans,',
        fontWeight: 400,
        cssClass: 'apexcharts-yaxis-label',
      },
    },
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    fontSize: '14px',
    fontFamily: 'Nunito Sans',
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: [],
    offsetX: -5,
    offsetY: -35,
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
      customHTML: undefined,
      onClick: undefined,
      offsetX: -3,
      offsetY: 3,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
  },
};

const ProfitLossChart = () => {
  const { data: expenseTotalAmountData, isLoading: expenseTotalLoadingData } = useGetExpenseTotalAmountQuery();
  const { data: totalProfitData, isLoading: totalProfitLoadingData } = useGetTotalProfitDashboardQuery();
  
  return (
    <>
      <ApexCharts options={options} width={'100%'} series={options.series} type="line" height={380} />
    </>
  );
};

export default ProfitLossChart;
