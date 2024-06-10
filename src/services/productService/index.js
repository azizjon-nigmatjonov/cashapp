import request from "../../utils/request";

const productService = {
    getList: (params) => request.get("/product", { params }),
    creaCategory: (data) => request.post("/product", data),
    deleteElement: (id) => request.delete(`/product/${id}`),
    getElement: (id) => request.get(`/product/${id}`),
    updateElement: (data) => request.put("/product", data),
}
export default productService