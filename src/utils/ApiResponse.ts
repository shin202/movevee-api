import { Response } from "express";

class ApiResponse {
  public successResponse = (res: Response, data: any, msg: string = "") => {
    return res.status(200).jsonp({
      status: "success",
      msg: msg,
      data: data,
    });
  };

  public badRequestResponse = (res: Response, msg: string = "") => {
    return res.status(400).json({
      status: "error",
      msg: msg,
    });
  };

  public notFoundResponse = (res: Response, msg: string = "") => {
    return res.status(404).json({
      status: "error",
      msg: msg,
    });
  };

  public serverErrorResponse = (res: Response, msg: string = "Something went wrong. Please try again later!") => {
    return res.status(500).json({
      status: "error",
      msg: msg,
    });
  };
}

export default ApiResponse;
