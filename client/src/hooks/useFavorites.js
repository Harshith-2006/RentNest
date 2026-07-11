import { useCallback, useEffect, useState } from "react";
import axios from "axios";
export function useFavorites() {
  const [ids, setIds] = useState([]);
  const token = localStorage.getItem("token");
  // FETCH FAVORITES
  useEffect(() => {

    if (!token) return;

    fetchFavorites();

  }, []);


  const fetchFavorites = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/favorite",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const favoriteIds =
        response.data.map(
          (fav) => fav.house._id
        );

      setIds(favoriteIds);

    } catch (error) {

      console.log(error);

    }

  };


  // TOGGLE FAVORITE
  const toggle = useCallback(async (id) => {

    try {

      // REMOVE FAVORITE
      if (ids.includes(id)) {

        const response = await axios.get(
          "http://localhost:5000/favorite",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const favorite = response.data.find(
          (fav) => fav.house._id === id
        );

        if (favorite) {

          await axios.delete(
            `http://localhost:5000/favorite/remove/${favorite._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

        }

        setIds((prev) =>
          prev.filter((x) => x !== id)
        );

      }

      // ADD FAVORITE
      else {

        await axios.post(
          `http://localhost:5000/favorite/add/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setIds((prev) => [...prev, id]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [ids, token]);
  const has = useCallback(

    (id) => ids.includes(id),

    [ids]

  );


  return {

    ids,
    toggle,
    has

  };

}