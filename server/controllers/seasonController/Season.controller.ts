import { ISeasonServiceInterface, SeasonService } from "../../services/index";
import { SERVICESTYPES } from "../../services/types";
import {
  httpGet,
  httpPost,
  httpPatch,
  controller,
} from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { ISeason } from "services/interfaces/schemasinterfaces";
import { IResponse } from "../../helpers/responseHelper/reponseInterface";
import { responseType } from "../../helpers/responseHelper/responseTypes";

@controller("/seasons")
export class SeasonController {
  @inject(SERVICESTYPES.seasonService)
  protected seasonService: ISeasonServiceInterface;

  @inject(responseType)
  protected CustomResponse: IResponse;

  @httpPost("/") //insert the middlewares for validations // no auth needed
  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const season: ISeason = req.body;
      const result = <ISeason[]>(
        await this.seasonService.find({SeasonID: season.SeasonID})
      );

      if (result.length !== 0) {
        return this.CustomResponse.conflict(res, `Season ${season.SeasonName} already exist`);
      }

      return this.CustomResponse.success(
        res,
        result,
        "user created successfully",
        201
      );
    } catch (error) {
      throw error;
    }
  }
}
