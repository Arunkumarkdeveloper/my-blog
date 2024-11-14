"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Table({ jwtToken }) {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const getSubscribers = async (id) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const date = await response.json();
      if (date) {
        setSubscribers(date);
      }
    };
    getSubscribers();
  }, []);

  const deleteSubscriber = async (id) => {
    const response = await fetch(`/api/subscribe/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <table id="customers">
      <tr>
        <th>#</th>
        <th>Email Address</th>
        <th>Date</th>
        <th>Delete</th>
      </tr>
      {subscribers?.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item?.email}</td>
          <td>{item?.date}</td>
          <td>
            <Image
              src="/images/delete.png"
              width={15}
              height={15}
              alt=""
              style={{ width: "15px" }}
              className="cursor-pointer"
              onClick={() => deleteSubscriber(item?._id)}
            />
          </td>
        </tr>
      ))}
    </table>
  );
}
