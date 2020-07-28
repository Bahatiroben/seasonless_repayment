import { Response } from "express";

export interface IResponse {
    success: (res: Response, data: object, message?: any, status?: number) => Response;
    conflict: (res: Response, message?: any) => Response;
    notFound: (res: Response, message?: any) => Response;
    badMethod: (res: Response, message?: any) => Response;
    unAuthorized: (res: Response, message?: any) => Response;
    forbidden: (res: Response, message?: any) => Response;
    validationError: (res: Response, message?: any) => Response;
}