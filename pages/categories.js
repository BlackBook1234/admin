import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [maincategories, setMainCategories] = useState(["LEXUS", "TOYOTA", "FORD","NISSAN","BMW","MERCEDES-BENZ","HONDA","HYUNDAI","AUDI","CADILAC","MAZDA","SUBARU","CHEVROLET","SUZUKI","KIA","VOLKSWAGEN","MITSUBISHI","JEEP","PORCHE","DODGE","FERRARI","JAGUAR"]);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, [])

  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map(p => ({
        name: p.name,
        values: p.values.split(','),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(',')
      }))
    );
  }
  function deleteCategory(category) {
    swal.fire({
      title: 'Ангилал устгах',
      text: `Ангилалыг устгах уу? ${category.name}`,
      showCancelButton: true,
      cancelButtonText: 'Цуцлах',
      confirmButtonText: 'Устгах',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete('/api/categories?_id=' + _id);
        fetchCategories();
      }
    });
  }
  function addProperty() {
    setProperties(prev => {
      return [...prev, { name: '', values: '' }];
    });
  }
  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <h1>Ангилал</h1>
      <label>
        {editedCategory
          ? `Ангила засах ${editedCategory.name}`
          : 'Ангилал үүсгэх'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <select
            onChange={ev => {
              setParentCategory(ev.target.value)
            }}
            value={parentCategory}>
            <option value="">Ангилал</option>
            {maincategories.length > 0 && maincategories.map(category1 => (
              <option key={category1} value={category1}>{category1}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder={'Дэд ангилал'}
            onChange={ev => setName(ev.target.value)}
            value={name} />


        </div>
        <div className="mb-2">
          <label className="block"></label>
          {/* <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2">
            Add new property
          </button> */}
          {properties.length > 0 && properties.map((property, index) => (
            <div key={property.name} className="flex gap-1 mb-2">
              <input type="text"
                value={property.name}
                className="mb-0"
                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                placeholder="property name (example: color)" />
              <input type="text"
                className="mb-0"
                onChange={ev =>
                  handlePropertyValuesChange(
                    index,
                    property, ev.target.value
                  )}
                value={property.values}
                placeholder="values, comma separated" />
              <button
                onClick={() => removeProperty(index)}
                type="button"
                className="btn-red">
                Устгах
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="btn-default">Цуцлах</button>
          )}
          <button type="submit"
            className="btn-primary py-1">
            Хадгалах
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Ангилал</td>
              <td>Дэд ангилал</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 && categories.map(category => (
              <tr key={category._id}>
                
                <td>{category?.parent}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-default mr-1"
                  >
                    Засах
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-red">Устгах</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => (
  <Categories swal={swal} />
));
