export function successResponse(res, data = {}, message = 'Operação realizada com sucesso') {
  return res.status(200).json({ success: true, data, message });
}

export function errorResponse(res, status, code, message) {
  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
    },
  });
}
