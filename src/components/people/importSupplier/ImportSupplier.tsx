'use client'
import React, { useRef } from 'react';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

const DownloadTemplateButton = () => {
  const handleDownloadTemplate = () => {
    const sampleData = "Name, Code, Category, Brand, Quantity, Price\nProduct 1, P001, Category 1, Brand 1, 10, 100.00\nProduct 2, P002, Category 2, Brand 2, 20, 200.00";
    const blob = new Blob([sampleData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'sample_template.xlsx');
  };

  return (
    <button className='inventual-btn btn-low-padding primary-btn' onClick={handleDownloadTemplate}>
      <span><i className="fa-sharp fa-regular fa-download"></i></span>
        Download Template
    </button>
  );
};

const ImportSupplier = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault(); 
  
    try {
      toast.success("Form submitted successfully!");
      if(fileInputRef.current){
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error("Failed to submit form. Please try again later.");
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className="inventual-content-area px-4 sm:px-7">
        <div className="inventual-import-porduct-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5 mt-10">
          <div className="grid grid-cols-12 gap-7">
            <div className="col-span-12 lg:col-span-6">
              <div className='flex flex-wrap sm:flex-nowrap justify-between items-end gap-5'>
                <div className="inventual-form-field w-full">
                  <h5>Upload Supplier Data</h5>
                  <div className="inventual-input-field-file-choose">
                  <input ref={fileInputRef} type="file" accept='.xlsx' required id="fileUploadN" />
                  </div>
                </div>
                <button type='submit' className='inventual-btn secondary-btn'><span><i className="fa-sharp fa-regular fa-upload"></i></span>Upload</button>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="instruction-area">
                <h4 className='instruction-heading'>Download Sample Template</h4>
                <span className='instruction-note'>
                  <span className='note-text'>Note : </span>
                  Please read the following instructions
                </span>
                <ol>
                  <li>Please Do not make any changes in given template.</li>
                  <li>Name column is mandatory.</li>
                  <li>Code column is mandatory.</li>
                  <li>Category column is mandatory.</li>
                  <li>Brand column is mandatory.</li>
                  <li>quantity column is mandatory.</li>
                  <li>price column is mandatory.</li>
                  <li>Only 200 records are accepted in the list at a time.</li>
                </ol>
                <DownloadTemplateButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </>
  );
};

export default ImportSupplier;
