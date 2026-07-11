import { useState } from "react";
import axios from "axios";

import ImageUpload from "@/components/ui/ImageUpload";

export default function AddHouse() {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");

  const [rent, setRent] = useState("");

  const [houseType, setHouseType] = useState("");

  const [furnished, setFurnished] = useState(false);

  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", title);

      formData.append("description", description);

      formData.append("location", location);

      formData.append("rent", rent);

      formData.append("houseType", houseType);

      formData.append("furnished", furnished);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:5000/house/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      // RESET FORM
      setTitle("");
      setDescription("");
      setLocation("");
      setRent("");
      setHouseType("");
      setFurnished(false);
      setImage(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add house"
      );

    }

  };


  return (

    <div className="mx-auto max-w-3xl px-4 py-10">

      <div className="rounded-3xl bg-white p-8 shadow-card dark:bg-slate-900">

        <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">
          Add New House
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Title
            </label>

            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Description
            </label>

            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Location
            </label>

            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Rent
            </label>

            <input
              type="number"
              required
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              House Type
            </label>

            <select
              value={houseType}
              onChange={(e) => setHouseType(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >

              <option value="">
                Select
              </option>

              <option value="Apartment">
                Apartment
              </option>

              <option value="Villa">
                Villa
              </option>

              <option value="Studio">
                Studio
              </option>

            </select>

          </div>

          <div className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={furnished}
              onChange={(e) =>
                setFurnished(e.target.checked)
              }
            />

            <label className="text-sm text-slate-700 dark:text-slate-200">
              Furnished
            </label>

          </div>

          <ImageUpload
            onChange={(files) =>
              setImage(files[0])
            }
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Add House
          </button>

        </form>

      </div>

    </div>

  );

}