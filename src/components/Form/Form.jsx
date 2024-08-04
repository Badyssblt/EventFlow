import React, { useState } from 'react'
import LoaderButton from '../Loader/LoaderButton';

function Form({children, submitText, onSubmit}) {

    const [loading, setLoading] = useState();
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
      };

      const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {
          onChange: handleChange,
        });
      });

  return (
    <form onSubmit={handleSubmit}>
        {childrenWithProps}
        <button type="submit" className='bg-blue-600 text-white px-6 py-2 rounded-full flex justify-center gap-2 w-full mt-2'>{submitText}
        <LoaderButton state={loading}/>
        </button>
    </form>
  )
}

export default Form