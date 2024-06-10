import request from "../../utils/request";
const branchService = {
  getList: (params) => request.get("/branch", { params }),
  getBranch: (id) => request.get(`/branch/${id}`, { data: { branch_id: id } }),
  createBranch: (data) => request.post("branch", data),
  deleteElement: (id) => request.delete(`branch/${id}`),
  updateElement: (data) => request.put(`branch`, data)
};

export default branchService;
