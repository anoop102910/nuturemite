// src/components/BusinessLicenseForm.jsx
"use client";
import React, { useEffect, useState } from "react";
import { Input, Label, Button } from "@/components/ui/index";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
const BusinessLicenseForm = () => {
  const [formData, setFormData] = useState({
    licenseNumber: "",
    issuedBy: "",
    issuedDate: "",
    expiryDate: "",
    documentUrl: "",
  });
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      const response = await api.get("/vendors/me/details");
      const data = response.data.data;
      setFormData({
        ...data.businessLicense,
        issuedDate: new Date(data.businessLicense.issuedDate)
          .toISOString()
          .split("T")[0],
        expiryDate: new Date(data.businessLicense.expiryDate)
          .toISOString()
          .split("T")[0],
      });
    };
    fetchVendorDetails();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);
    try {
      await api.put("/vendors/me/details", {
        businessLicense: formData,
      });
      tst.success("Business license updated successfully");
    } catch (error) {
      tst.error("Failed to update business license");
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const [documentPreview, setDocumentPreview] = useState(null);
  const [formEnabled, setFormEnabled] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevData => ({
        ...prevData,
        documentUrl: e.target.files[0].name,
      }));
      setDocumentPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    setFormEnabled(Object.values(formData).some(value => value.trim() !== ""));
  }, [formData]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 max-w-lg w-full">
        <h2 className="h4-primary">Business License Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="licenseNumber" className="w-32 ">
              License Number
            </Label>
            <Input
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="issuedBy" className="w-32 ">
              Issued By
            </Label>
            <Input
              id="issuedBy"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="issuedDate" className="w-32 ">
              Issued Date
            </Label>
            <Input
              id="issuedDate"
              name="issuedDate"
              type="date"
              value={formData.issuedDate}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="expiryDate" className="w-32 ">
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="documentUrl" className="w-32 ">
              Upload Document
            </Label>
            <input
              id="documentUrl"
              name="documentUrl"
              type="file"
              accept="application/pdf,application/msword,application/vnd.ms-excel"
              onChange={handleFileChange}
              className="flex-1"
            />
          </div>
          {documentPreview && (
            <div className="mt-4">
              <a
                href={documentPreview}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Preview Document
              </a>
            </div>
          )}
          <Button type="submit" pending={pending} className="w-full" disabled={!formEnabled}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BusinessLicenseForm;
