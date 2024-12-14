"use client"
import React from 'react';
import Chart from 'react-apexcharts'

const StockAnalysisChart = () => {

  const option: any = {
    series: [
      {
        name: "Opening Stock",
        data: [1.1, 3, 5, 3, 4.1, 4.9, 6.5, 8.5]
      },
      {
        name: "Closing Stock",
        data: [1.4, 2, 2.5, 4, 3.5, 3.8, 5.8, 7.6]
      }
    ],
    chart: {
      type: "bar",
      height: 492,
      width: '100%',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Stock Analysis",
      align: "left",
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Nunito Sans',
        color: '#263238'
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#FF9720", "#2C6AE5"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [2015, 2016, 2017, 2018, 2019, 2020, 2022, 2023]
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#f1f1f1"
        },
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
        title: {
          text: "Stock (Amount)",
          rotate: -90,
          offsetX: -4,
          offsetY: 0,
          style: {
            color: "#FF9720",
            fontSize: '14px',
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        tooltip: {
          enabled: true
        }
      },
    ],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      fontSize: '15px',
      fontFamily: 'Nunito Sans',
      fontWeight: 400,
      offsetX: -5,
      offsetY: -35,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 30,
        height: 15,
        radius: 3,
        strokeWidth: 0,
        strokeColor: '#fff',
        offsetX: -2,
        offsetY: 3,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$ " + val;
        }
      }
    },
  }

  return (
    <>
      <Chart options={option} series={option.series} type="bar" height={492} />
    </>
  );
};

export default StockAnalysisChart;

