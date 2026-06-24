export type SendResponsePayload<TData, TMeta = undefined> = {
  statusCode: number;
  message: string;
  data: TData;
  meta?: TMeta;
  success?: boolean;
};

export type SendResponseResult<TData, TMeta = undefined> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TData;
  meta?: TMeta;
};

export function sendResponse<TData, TMeta = undefined>({
  statusCode,
  message,
  data,
  meta,
  success = true,
}: SendResponsePayload<TData, TMeta>): SendResponseResult<TData, TMeta> {
  return {
    success,
    statusCode,
    message,
    data,
    ...(meta === undefined ? {} : { meta }),
  };
}
