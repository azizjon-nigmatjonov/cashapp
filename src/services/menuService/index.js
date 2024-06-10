import request from "../../utils/request";

const menuService = {
  getList: (params) => request.get("/menu", { params }),
  createElement: (data) => request.post('/menu', data),
  getElement: (id) => request.get(`/menu/${id}`),
  updateElement: (data) => request.put('/menu', data),
  deleteElement: (id) => request.delete(`/menu/${id}`)
};
export default menuService;
