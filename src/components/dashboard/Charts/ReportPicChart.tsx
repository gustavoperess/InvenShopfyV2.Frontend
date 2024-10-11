"use client"
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: any = {
  series: [44, 55, 13, 43],
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

  return (
    <div >
      <ApexCharts options={options}  width={380} series={options.series} type="pie" height={300} />
    </div>
  );
};

export default ReportPicChart;
