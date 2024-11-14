import { Database } from "@/backend/Database";
import Blog from "@/backend/schema/Blog";
import {
  currentDate,
  stopWords,
  transporterOptions,
  mailOptions,
} from "@/frontend/utility";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export const POST = async (request) => {
  try {
    await Database();
    const { ...newData } = await request.json();
    const isExist = await Blog.findOne({ pageUrl: newData?.pageUrl });
    if (isExist) {
      return NextResponse.json({ message: "Already exist" }, { status: 404 });
    }
    await Blog.create({ ...newData, date: currentDate() });
    const transporter = nodemailer.createTransport(transporterOptions);
    await transporter.sendMail(
      mailOptions("akumararkumar@gmail.com", "new-post", newData)
    );
    return NextResponse.json(
      { message: "New Blog Post created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (request) => {
  try {
    await Database();
    const getQueryParam = (param, defaultValue = "") => {
      const value = request?.nextUrl?.searchParams?.get(param);
      return value ? value : defaultValue;
    };

    const page = parseInt(getQueryParam("page")) || 1;
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;

    const type = getQueryParam("type");
    const pageUrl = getQueryParam("pageUrl");
    const search = getQueryParam("search");

    let data;
    let query = {};

    if (type === "sitemap") {
      data = await Blog.aggregate([
        {
          $group: {
            _id: {
              pageUrl: "$pageUrl",
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
    } else if (type === "search") {
      const keywords = search
        .split(/\s+/)
        .filter((word) => !stopWords.includes(word.toLowerCase()) && word);

      if (!keywords.length) {
        data = [];
      }

      query["$or"] = [
        {
          keywords: {
            $in: keywords.map((word) => new RegExp(word, "i")),
          },
        },
        {
          "blogData.title": {
            $in: keywords.map((word) => new RegExp(word, "i")),
          },
        },
        {
          "blogData.description": {
            $in: keywords.map((word) => new RegExp(word, "i")),
          },
        },
        // {
        //   "blogData.content": {
        //     $in: keywords.map((word) => new RegExp(word, "i")),
        //   },
        // },
      ];
      data = await Blog.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: {
              pageUrl: "$pageUrl",
              title: "$blogData.title",
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
    } else if (type === "featured-posts") {
      const sourceBlog = await Blog.aggregate([
        {
          $match: {
            pageUrl: { $regex: new RegExp(pageUrl, "i") },
          },
        },
        {
          $group: {
            _id: {
              keywords: "$keywords",
            },
          },
        },
      ]);
      const keywordMatch = sourceBlog[0]?._id?.keywords || [];
      if (keywordMatch && keywordMatch.length > 0) {
        query["$or"] = [
          {
            keywords: {
              $in: keywordMatch.map((keyword) => new RegExp(keyword, "i")),
            },
          },
          {
            pageUrl: {
              $in: keywordMatch.map((keyword) => new RegExp(keyword, "i")),
            },
          },
          {
            "blogData.title": {
              $in: keywordMatch.map((keyword) => new RegExp(keyword, "i")),
            },
          },
          {
            "blogData.description": {
              $in: keywordMatch.map((keyword) => new RegExp(keyword, "i")),
            },
          },
          {
            "blogData.content": {
              $in: keywordMatch.map((keyword) => new RegExp(keyword, "i")),
            },
          },
        ];
      }

      data = await Blog.aggregate([
        {
          $match: {
            ...query,
            pageUrl: { $ne: pageUrl },
          },
        },
        {
          $group: {
            _id: {
              pageUrl: "$pageUrl",
              title: "$blogData.title",
              description: "$blogData.description",
              titleImage: "$blogData.titleImage",
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $skip: 1,
        },
        {
          $limit: 5,
        },
      ]);

      if (data.length < 5) {
        const additionalData = await Blog.aggregate([
          {
            $match: {
              pageUrl: { $ne: pageUrl },
            },
          },
          {
            $group: {
              _id: {
                pageUrl: "$pageUrl",
                title: "$blogData.title",
                description: "$blogData.description",
                titleImage: "$blogData.titleImage",
              },
            },
          },
          {
            $sort: { _id: 1 },
          },
          {
            $limit: 5 - data.length,
          },
        ]);
        data = data?.concat(additionalData);
      }
    } else {
      data = await Blog.aggregate([
        {
          $group: {
            _id: {
              pageUrl: "$pageUrl",
              title: "$blogData.title",
              description: "$blogData.description",
              titleImage: "$blogData.titleImage",
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $skip: offset,
        },
        {
          $limit: itemsPerPage,
        },
      ]);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};