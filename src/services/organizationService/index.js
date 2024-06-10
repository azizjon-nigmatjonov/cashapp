import request from "../../utils/request";

const organizationService = {
  getList: (params) => request.get("/organization", { params }),
  createOrganizationFn: (data) => request.post("/organization", data),
  deleteElement: (id) => request.delete(`/organization/${id}`),
  getElement: (id) => request.get(`/organization/${id}`),
  updateElement: (data) => request.put("/organization", data),
};

export default organizationService;
