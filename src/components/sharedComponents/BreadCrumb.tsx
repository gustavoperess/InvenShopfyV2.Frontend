import React from "react";
interface propsType {
  title?: string;
  subTitleOne?: string;
  subTitleTwo?: string;
  subTitleThree?: string;
}
const BreadCrumb = ({ title, subTitleOne, subTitleTwo, subTitleThree }: propsType) => {
  return (
    <>
      <div className="inventual-breadcrumb-area px-7 py-9 bg-white mb-5">
        <div className="inventual-breadcrumb-area-inner px-0.5">
          <h5 className="text-[20px] text-heading font-bold mb-3">{title}</h5>
          <div className="inventual-breadcrumb-area-inner-wrap">
            <span className="text-[14px] text-body font-normal inline-block me-2">{subTitleOne}</span>
            {subTitleTwo &&
              <>
                <span className="text-[14px] text-body font-normal inline-block me-2"><i className="fa-regular fa-chevron-right"></i></span>
                <span className="text-[14px] text-body font-normal inline-block me-2">{subTitleTwo}</span>
              </>
            }
            {subTitleThree &&
              <>
                <span className="text-[14px] text-body font-normal inline-block me-2"><i className="fa-regular fa-chevron-right"></i></span>
                <span className="text-[14px] text-body font-normal inline-block me-2">{subTitleThree}</span>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
