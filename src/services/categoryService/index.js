import request from "../../utils/request";

const categoryService = {
  getList: (params) => request.get("/category", { params }),
  creaCategory: (data) => request.post("/category", data),
  deleteElement: (id) => request.delete(`/category/${id}`),
  getElement: (id) => request.get(`/category/${id}`),
  updateElement: (data) => request.put("/category", data),
};

export default categoryService;
