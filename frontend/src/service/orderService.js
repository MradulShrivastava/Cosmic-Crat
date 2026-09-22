import apiClient from "./api/apiClient";
import { API_URL } from "./api/apiUrl";

export async function submitOrder(orderPayload) {
  const response = await apiClient.post(API_URL.CREATE_ORDER_API, orderPayload);
  return response.data;
}
