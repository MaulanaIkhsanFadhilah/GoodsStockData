import Table from "./components/Table";
import Form from "./components/Form";
import Button from "./components/element/Button";
import { IconPlus } from "@tabler/icons-react";
import { useState, useEffect } from "react";

function App() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(undefined);
  const [brand, setBrand] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //melakukan fetching data
      const response = await fetch("https://dummyjson.com/products?limit=0");
      const data = await response.json();
      setTableData(data.products);
    } catch (error) {
      console.log("Error mendapatkan user: " + error);
    }
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleStock = (event) => {
    setStock(event.target.value);
  };
  const handleBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title && description && stock && brand) {
      const newData = { id, title, description, stock, brand };
      try {
        const response = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        setTableData([...tableData, data]);
        setId("");
        setTitle("");
        setDescription("");
        setStock("");
        setBrand("");
      } catch (error) {
        console.log("Error menambahkan User" + error);
      }
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    const updateUser = tableData.find((data) => data.id === id);
    if (updateUser) {
      setId(id);
      setTitle(updateUser.title);
      setDescription(updateUser.description);
      setStock(updateUser.stock);
      setBrand(updateUser.brand);
    }
  };

  const handleUpdate = async () => {
    if (title && description && stock && brand) {
      const updateData = { id, title, description, stock, brand };
      try {
        await fetch("https://dummyjson.com/products/" + id, {
          method: "PUT",
          body: JSON.stringify({ updateData }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const updatedTableData = tableData.map((data) =>
          data.id === id ? updateData : data
        );
        setTableData(updatedTableData);
        setId("");
        setTitle("");
        setDescription("");
        setStock("");
        setBrand("");
      } catch (error) {
        console.log("Error updating user: " + error);
      }
    }
  };

  const handleDelete = async (id) => {
    //your code act
    try {
      await fetch("https://dummyjson.com/products/" + id, {
        method: "DELETE",
      });

      const deletedData = tableData.filter((data) => data.id !== id);
      setTableData(deletedData);
    } catch (error) {
      console.log("Error menghapus user: " + error);
    }
  };

  console.log(tableData);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-b from-royal-blue-300 to-royal-blue-600 gap-y-5">
        <h1 className="flex justify-center font-bold text-4xl text-gray-600 py-8  ">
          GOODS STOCK DATA
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.FieldSet>
            <Form.Input
              type="text"
              value={title}
              onChange={handleTitle}
              placeholder="Title"
            ></Form.Input>
            <br />
            <Form.Input
              type="text"
              value={description}
              onChange={handleDescription}
              placeholder="Description"
            ></Form.Input>
            <br />
            <Form.Input
              type="number"
              value={stock}
              onChange={handleStock}
              placeholder="Stock"
            ></Form.Input>
            <br />
            <Form.Input
              type="text"
              value={brand}
              onChange={handleBrand}
              placeholder="Brand"
            ></Form.Input>
          </Form.FieldSet>
          <Button
            type="submit"
            className="flex justify-center bg-sky-500 hover:bg-sky-700 active:bg-sky-600"
            text={
              <>
                <IconPlus />
                Add Data
              </>
            }
          ></Button>
          <Button
            type="submit"
            className="flex mt-4 justify-center bg-teal-500 shadow-lg hover:bg-teal-700 active:bg-teal-600"
            text={<>Update Data</>}
            onClick={handleUpdate}
          ></Button>
        </Form>
        <br />
        <br />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Id</Table.Head>
              <Table.Head>Title</Table.Head>
              <Table.Head>Description</Table.Head>
              <Table.Head>Stock</Table.Head>
              <Table.Head>Brand</Table.Head>
              <Table.Head></Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from(tableData).map((data, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Data>{data.id}</Table.Data>
                  <Table.Data>{data.title}</Table.Data>
                  <Table.Data>{data.description}</Table.Data>
                  <Table.Data>{data.stock}</Table.Data>
                  <Table.Data>{data.brand}</Table.Data>
                  <Table.Data>
                    <div className="flex items-center justify-center gap-x-4">
                      <Table.Button onClick={() => handleEdit(data.id)}>
                        Edit
                      </Table.Button>
                      <Table.Button
                        className="flex justify-center bg-rose-500 hover:bg-rose-700 active:bg-rose-600"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </Table.Button>
                    </div>
                  </Table.Data>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default App;
