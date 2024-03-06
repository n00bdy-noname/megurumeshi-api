import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const defaultEndpoint = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json&large_area=Z011`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let url = defaultEndpoint;

  if (req.query.keyword !== undefined) {
    const keyword = req.query.keyword as string;
    url = `${url}&keyword=${keyword}`;
  }

  url = encodeURI(url);

  try {
    const result = await fetch(url);
    const data = await result.json();
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "エラーが発生しました", error: error.message });
  }
};
