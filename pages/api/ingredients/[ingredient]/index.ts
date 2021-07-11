import type { NextApiRequest, NextApiResponse } from "next";
import faker from "faker";

type PayloadRes = {
  basil: number;
  black_pepper: number;
  cheese: number;
  chicken: number; // 5000
  chili_pepper: number;
  corn: number;
  mass: number;
  mozzarella: number;
  mushrooms: number;
  onion: number;
  parmesan: number;
  peperoni: number; // 4500
  pesto: number;
  salami: number;
  shrimp: number;
  tomatoes: number;
};

type PayloadError = {
  error: string;
  status: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PayloadRes | PayloadError>
) {
  const { ingredient } = req.query;

  if (ingredient !== "pizza") {
    const payload = `Ingredient ${ingredient} Not Allowed`;
    return res.status(404).json({ error: payload, status: 404 });
  }

  const dbData: PayloadRes = {
    basil: parseInt(faker.commerce.price()) * 10,
    black_pepper: parseInt(faker.commerce.price()) * 10,
    cheese: parseInt(faker.commerce.price()) * 10,
    chicken: 5000, // 5000
    chili_pepper: parseInt(faker.commerce.price()) * 10,
    corn: parseInt(faker.commerce.price()) * 10,
    mass: parseInt(faker.commerce.price()) * 10,
    mozzarella: parseInt(faker.commerce.price()) * 10,
    mushrooms: parseInt(faker.commerce.price()) * 10,
    onion: parseInt(faker.commerce.price()) * 10,
    parmesan: parseInt(faker.commerce.price()) * 10,
    peperoni: 4500, // 4500
    pesto: parseInt(faker.commerce.price()) * 10,
    salami: parseInt(faker.commerce.price()) * 10,
    shrimp: parseInt(faker.commerce.price()) * 10,
    tomatoes: parseInt(faker.commerce.price()) * 10,
  };

  const simulateDatabaseQuery = (delay: number = 3000): Promise<PayloadRes> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(dbData);
      }, delay);
    });

  try {
    const data: PayloadRes = await simulateDatabaseQuery();
    return res.status(200).json({ ...data });
  } catch (error) {
    const payload = `Error getting ingredient - ${ingredient}`;
    return res.status(404).json({ error: payload, status: 404 });
  }
}
