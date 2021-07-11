import type { NextApiRequest, NextApiResponse } from "next";
import faker from "faker";

interface IIngsSelected {
  ingredient: string;
  data: {
    quantity: number;
    total_value: string | number;
  };
}

interface IIngsRemoved {
  ingredient: string;
  data: {
    quantity: number;
    total_value: string | number;
  };
}

interface ISale {
  kind_of_food: string;
  sale_details: {
    date: Date;
    ingredients_selected: Array<IIngsSelected>;
    ingredients_that_were_removed_after_selection: Array<IIngsRemoved>;
    phone_number: number | string;
    pizza_name: string;
    total_items_selected: number | string;
    total_price: number | string;
    user_name: string;
  };
}

type PayloadRes = {
  sales: Array<ISale>;
};

type PayloadError = {
  error: string;
  status: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PayloadRes | PayloadError>
) {
  const { method } = req;

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ error: `Method ${method} Not Allowed`, status: 405 });
  }

  const dataRes: Array<ISale> = new Array(50).fill(null).map(() => ({
    kind_of_food: "pizza",
    sale_details: {
      date: faker.date.recent(),
      user_name: faker.name.firstName(),
      pizza_name: faker.music.genre(),
      phone_number: faker.phone.phoneNumber(),
      total_price: faker.commerce.price(40000, 150000),
      total_items_selected: faker.datatype.number(40),
      ingredients_selected: Array(10)
        .fill(null)
        .map((_) => ({
          ingredient: faker.commerce.productName(),
          data: {
            quantity: faker.datatype.number(50),
            total_value: faker.commerce.price(4000, 100000),
          },
        })),
      ingredients_that_were_removed_after_selection: Array(1)
        .fill(null)
        .map((_) => ({
          ingredient: faker.commerce.productName(),
          data: {
            quantity: 0,
            total_value: 0,
          },
        })),
    },
  }));

  const simulateDatabaseQuery = (delay: number = 2500): Promise<PayloadRes> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sales: dataRes });
      }, delay);
    });

  try {
    const data: PayloadRes = await simulateDatabaseQuery();
    return res.status(200).json(data);
  } catch (error) {
    const payload = "Error getting data";
    return res.status(404).json({ error: payload, status: 404 });
  }
}
