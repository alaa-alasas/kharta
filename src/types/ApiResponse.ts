import type { CustomerGift } from "./CustomerGift";
import type { Item } from "./Item";

export type ApiResponse = {
  success: boolean;
  data: Item[] | CustomerGift[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
  search: string;
};