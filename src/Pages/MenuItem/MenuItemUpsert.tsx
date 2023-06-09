import React, { useState, useEffect } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { MainLoader } from "../../Components/Page/Common";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../apis/manuItemApi";
import { useNavigate, useParams } from "react-router-dom";
import { SD_Categories } from "../../Utility/SD";

const Categories = [
  SD_Categories.APPETIZER,
  SD_Categories.ENTREE,
  SD_Categories.DESSERT,
  SD_Categories.BEVERAGES,
];

const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: Categories[0],
  price: "",
};

function MenuItemUpsert() {
  const { id } = useParams();

  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplayed, setImageToDisplayed] = useState<string>();
  const [menuItemInputs, setmenuItemInputs] = useState(menuItemData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();

  const { data } = useGetMenuItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setmenuItemInputs(tempData);
      setImageToDisplayed(data.result.image);
    }
  }, [data]);

  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setmenuItemInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImgTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File must be less than 1MB", "error");
        return;
      } else if (isImgTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File must be in jpeg, jpg, or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplayed(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("SpecialTag", menuItemInputs.specialTag ?? "");
    formData.append("Category", menuItemInputs.category);
    formData.append("Price", menuItemInputs.price);
    if (imageToDisplayed) formData.append("File", imageToStore);

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateMenuItem({ data: formData, id });
      toastNotify("Menu Item updated successfully", "success");
    } else {
      //create
      response = await createMenuItem(formData);
      if (!response) {
        toastNotify("Error creating menu item", "error");
      }
      toastNotify("Menu Item created Sucessfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/menuitem/menuitemlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">
        {id ? "Edit Menu Item" : "Add Menu Item"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={menuItemInputs.name}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={menuItemInputs.description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={menuItemInputs.specialTag}
              onChange={handleMenuItemInput}
            />
            <select
              className="form-control mt-3 form-select"
              placeholder="Enter Category"
              name="category"
              value={menuItemInputs.category}
              onChange={handleMenuItemInput}
            >
              {Categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleFileChange}
            />
            <div className="row text-center">
              <div className="col-6">
                <a
                  style={{ width: "75%" }}
                  onClick={() => navigate("/menuitem/menuitemlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Menu Items
                </a>
              </div>
              <div className="col-6">
                <button
                  type="submit"
                  style={{ width: "75%" }}
                  className="btn btn-success mt-3 form-control"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplayed}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
