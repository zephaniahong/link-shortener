/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=100000, stale-while-revalidate");

  if (!slug || typeof slug !== "string") {
    res.status(404).send(JSON.stringify({ message: "Please use with aslug" }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.status(404).send(JSON.stringify({ message: "slug not found" }));
    return;
  }

  return res.json(data);
};
