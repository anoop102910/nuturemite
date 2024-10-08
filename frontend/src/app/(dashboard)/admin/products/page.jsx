"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useProducts } from "@/lib/data";
import DataTable from "@/components/tables/DataTable";
import { tst } from "@/lib/utils";
import Error from "@/components/shared/error";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import SearchInput from "@/components/filters/search";
import Link from "next/link";
import { AlertBox } from "@/components/ui/alert-dialog";
import OutLoader from "@/components/ui/outloader";
import { useSearchParams } from "next/navigation";
import { Switch } from "@mui/material";
import { IMAGE_URL } from "@/constants";

const ProductList = () => {
  const searchParams = useSearchParams();
  const filters = {
    search: searchParams.get("search"),
    apvStatus: searchParams.get("apvStatus"),
  };
  const apvStatus = searchParams.get("apvStatus");
  const { products, error, isLoading, mutate } = useProducts({ limit: 50, ...filters });
  const [pending, setPending] = useState(false);

  const handleVerify = async id => {
    setPending(true);
    try {
      await api.put(`/products/${id}`, { apvStatus: "approved" });
      await mutate();
      tst.success("Product verified successfully");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleReject = async id => {
    setPending(true);
    try {
      await api.put(`/products/${id}`, { apvStatus: "rejected" });
      await mutate();
      tst.success("Product has been rejected");
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleProductDelete = async id => {
    try {
      setPending(true);
      await api.delete(`/products/${id}`);
      await mutate();
      tst.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  
  const handleStatus = async (id, active) => {
    try {
      setPending(true);
      await api.put(`/products/${id}`, { active: !active });
      await mutate();
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };


  const handleFeatured = async (id, featured) => {
    try {
      setPending(true);
      await api.put(`/products/${id}`, { featured: !featured });
      await mutate();
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };



  if (error) return <Error />;

  const columns = [
    {
      key: "name",
      label: "Name",
      render: item => (
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 object-cover rounded"
            src={`${IMAGE_URL}/${item.images[0]}` || "./noimage.png"}
            alt="product image"
          />
          <span className="truncate w-60">{item.name}</span>
        </div>
      ),
    },
    { key: "mrp", label: "MRP", render: item => `₹${item.mrp}` },
    { key: "price", label: "SP", render: item => `₹${item.price}` },
    {
      key: "category",
      label: "Category",
      render: item => item.categories.map(cat => cat.name).join(" • ") || "-",
    },
  ];

  if (apvStatus === "approved") {
    columns.push({
      key: "active",
      label: "Active",
      render: item => (
        <Switch onChange={() => handleStatus(item._id, item.active)} checked={item.active} />
      ),
    });
    columns.push({
      key: "featured",
      label: "Featured",
      render: item => (
        <Switch onChange={() => handleFeatured(item._id, item.featured)} checked={item.featured} />
      ),
    });
  }

  const actions = item => {
    if (apvStatus === "pending")
      return (
        <>
          <AlertBox btnName={"Verify"} onClick={() => handleVerify(item._id)}>
            <Button size="xs">Approve</Button>
          </AlertBox>
          <AlertBox btnName={"Reject"} onClick={() => handleReject(item._id)}>
            <Button variant={"destructive"} size="xs">
              Reject
            </Button>
          </AlertBox>
        </>
      );
    else if (apvStatus === "rejected")
      return (
        <>
          <AlertBox btnName={"Verify"} onClick={() => handleVerify(item._id)}>
            <Button size="xs">Approve</Button>
          </AlertBox>
          <AlertBox onClick={() => handleProductDelete(item._id)}>
            <Trash className="text-red-600" />
          </AlertBox>
        </>
      );
    else
      return (
        <>
          <AlertBox onClick={() => handleProductDelete(item._id)}>
            <Trash className="text-red-600" />
          </AlertBox>
          <Link href={`/vendor/products/edit/${item._id}/`}>
            <Edit className="text-green-500" />
          </Link>
        </>
      );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div>
          <SearchInput className="md:w-60" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        actions={actions}
        caption="List of all products."
        pending={pending}
      />
      <OutLoader loading={pending} />
    </div>
  );
};

export default ProductList;
