"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Reset() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    postReset();
  }, []);

  useEffect(() => {
    window.location.href = '/';
  }, [response]);

  const postReset = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reset`, {
        headers: {Authorization: `Bearer ${getCookie("accessToken")}`,}
      });
      setResponse(response.data); // Assuming the response data contains user information
      //setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      //setLoading(false);
    }
  };

  if (response) {
    return (<div>{response}</div>);
  }
  if (!response) {
    return (<div>Waiting</div>);
  }
}
