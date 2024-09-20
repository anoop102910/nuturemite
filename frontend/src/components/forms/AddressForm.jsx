"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useSWRConfig } from "swr";

export default function AddressForm({ update, address }) {
  const { mutate } = useSWRConfig();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    address: "",
  });

  useEffect(() => {
    if (update && address) {
      setFormData({
        ...address,
      });
    }
  }, [update, address]);

  const [pending, setPending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      if (update) await api.put(`/addresses/${address._id}`, formData);
      else await api.post("/addresses", formData);
      await mutate("/my-addresses");
      tst.success("Address Added");
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="h2-primary">Add Address</h2>
      <form className="space-y-4 w-full bg-white p-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="fname" className="mb-2">
            First Name
          </Label>
          <Input
            type="text"
            name="fname"
            id="fname"
            placeholder="E.g. 123-456-7890"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>{" "}
        <div>
          <Label htmlFor="lname" className="mb-2">
            Last Name
          </Label>
          <Input
            type="text"
            name="lname"
            id="lname"
            placeholder="E.g. 123-456-7890"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="E.g. 123-456-7890"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="phone" className="mb-2">
            Phone
          </Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="E.g. 123-456-7890"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="city" className="mb-2">
            City
          </Label>
          <Input
            type="text"
            name="city"
            id="city"
            placeholder="E.g. New York"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="state" className="mb-2">
            State
          </Label>
          <Input
            type="text"
            name="state"
            id="state"
            placeholder="E.g. NY"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="zipcode" className="mb-2">
            ZIP Code
          </Label>
          <Input
            type="text"
            name="zipcode"
            id="zipcode"
            placeholder="E.g. 10001"
            value={formData.zipcode}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="address" className="mb-2">
            Address
          </Label>
          <Textarea
            type="text"
            name="address"
            id="address"
            placeholder="E.g. 10001"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <Button pending={pending} type="submit">
          {update ? "Update Address" : "Add Address"}
        </Button>
      </form>
    </div>
  );
}