import request from "../../utils/request";

const rankService = {
  getList: (params) => request.get("/organization_rank", { params }),
  updateElement: (params) => request.put("/organization_rank", params),
};

export default rankService;
