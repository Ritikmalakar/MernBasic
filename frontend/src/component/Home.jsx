import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { baseUrl1 } from '../../Axios';
import { Link } from 'react-router-dom';

export default function Home() {

  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {

      const { data } =
        await baseUrl1.get("/getAll");

      setTodoData(data.todo);

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
      );
    }
  };

  const deleteData = async (id) => {
    try {

      const { data } =
        await baseUrl1.post(`/delete/${id}`);

      if (data?.success) {
        toast.success(data?.message);
        getAll();
      }

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
      );
    }
  };

  return (
    <div>

      <table border="1">

        <thead>
          <tr>
            <th>idx</th>
            <th>image</th>
            <th>title</th>
            <th>price</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          {
            todoData.map((item, idx) => {
              return (
                <tr key={idx}>

                  <td>{idx + 1}</td>

                  <td>
                    {
                      item.image ? (
                        <img
                          src={item.image}
                          alt="img"
                          width="80"
                          height="80"
                        />
                      ) : (
                        "No Image"
                      )
                    }
                  </td>

                 

                  <td>{item.title}</td>
                  <td>{item.price}</td>

                  <td>
                    <button
                      onClick={() =>
                        deleteData(item._id)
                      }
                    >
                      delete
                    </button>

                    <Link
                      to={"/update/" + item._id}
                    >
                      update
                    </Link>
                  </td>

                </tr>
              );
            })
          }
        </tbody>

      </table>

    </div>
  );
}