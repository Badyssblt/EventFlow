import React, { useState } from 'react'

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


      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

      const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {
          onChange: handleChange,
        });
      });

  return (
    <form onSubmit={handleSubmit}>
        {childrenWithProps}
        <button type="submit" className='bg-blue-600 text-white px-6 py-2 rounded-full'>{submitText}</button>
    </form>
  )
}

export default Form