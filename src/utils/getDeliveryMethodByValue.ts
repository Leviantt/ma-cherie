import { DeliveryMethod } from "@prisma/client";

export function getDeliveryMethodByValue(value: string) {
  if(value == DeliveryMethod.BY_COURIER) return DeliveryMethod.BY_COURIER;

  return DeliveryMethod.SELF_DELIVERY;
}