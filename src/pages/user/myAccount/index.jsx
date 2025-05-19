// import React, { useEffect, useState } from 'react';
// import './index.scss';
// import { getProfile, updateProfile } from '../../../services/api';

// const MyAccount = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       zipcode: '',
//       country: '',
//     },
//   });

//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getProfile();
//         setFormData((prev) => ({
//           ...prev,
//           ...res.data,
//           address: {
//             ...prev.address,
//             ...(res.data.address || {}),
//           },
//         }));
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith('address.')) {
//       const key = name.split('.')[1];
//       setFormData((prev) => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [key]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateProfile(formData);
//       setMessage('Profile updated successfully!');
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setMessage('Failed to update profile.');
//     }
//   };

//   return (
//     <div className="account-page">
//       <h2>My Account</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//           />

//           <h4>Address</h4>
//           <input
//             type="text"
//             name="address.street"
//             placeholder="Street"
//             value={formData.address.street}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="address.city"
//             placeholder="City"
//             value={formData.address.city}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="address.state"
//             placeholder="State"
//             value={formData.address.state}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="address.zipcode"
//             placeholder="Zip Code"
//             value={formData.address.zipcode}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="address.country"
//             placeholder="Country"
//             value={formData.address.country}
//             onChange={handleChange}
//           />

//           <button type="submit">Save Changes</button>
//           {message && <p>{message}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default MyAccount;

// //2nd

// // import React, { useEffect, useState } from 'react';
// // import './index.scss';
// // import { getProfile, updateProfile } from '../../../services/api';

// // const MyAccount = () => {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     phone: '',
// //     address: {
// //       street: '',
// //       city: '',
// //       state: '',
// //       zipcode: '',
// //       country: '',
// //     },
// //     shippingAddress: {
// //       street: '',
// //       city: '',
// //       state: '',
// //       zipcode: '',
// //       country: '',
// //     },
// //   });

// //   const [loading, setLoading] = useState(true);
// //   const [message, setMessage] = useState('');

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await getProfile();
// //         if (res.success) {
// //           const { username, email, phone, address, shippingAddress } = res.data;
// //           setFormData({
// //             username,
// //             email,
// //             phone,
// //             address: address || { street: '', city: '', state: '', zipcode: '', country: '' },
// //             shippingAddress: shippingAddress || { street: '', city: '', state: '', zipcode: '', country: '' },
// //           });
// //         } else {
// //           console.error('Error fetching user profile:', res.message);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching user profile:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUser();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name.startsWith('address.')) {
// //       const key = name.split('.')[1];
// //       setFormData((prev) => ({
// //         ...prev,
// //         address: {
// //           ...prev.address,
// //           [key]: value,
// //         },
// //       }));
// //     } else if (name.startsWith('shippingAddress.')) {
// //       const key = name.split('.')[1];
// //       setFormData((prev) => ({
// //         ...prev,
// //         shippingAddress: {
// //           ...prev.shippingAddress,
// //           [key]: value,
// //         },
// //       }));
// //     } else {
// //       setFormData((prev) => ({
// //         ...prev,
// //         [name]: value,
// //       }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await updateProfile(formData);
// //       setMessage('Profile updated successfully!');
// //     } catch (err) {
// //       console.error('Error updating profile:', err);
// //       setMessage('Failed to update profile.');
// //     }
// //   };

// //   return (
// //     <div className="account-page">
// //       <h2>My Account</h2>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             name="username"
// //             placeholder="Username"
// //             value={formData.username}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={formData.email}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="phone"
// //             placeholder="Phone Number"
// //             value={formData.phone}
// //             onChange={handleChange}
// //           />

// //           <h4>Address</h4>
// //           <input
// //             type="text"
// //             name="address.street"
// //             placeholder="Street"
// //             value={formData.address.street}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="address.city"
// //             placeholder="City"
// //             value={formData.address.city}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="address.state"
// //             placeholder="State"
// //             value={formData.address.state}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="address.zipcode"
// //             placeholder="Zip Code"
// //             value={formData.address.zipcode}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="address.country"
// //             placeholder="Country"
// //             value={formData.address.country}
// //             onChange={handleChange}
// //           />

// //           <h4>Shipping Address</h4>
// //           <input
// //             type="text"
// //             name="shippingAddress.street"
// //             placeholder="Street"
// //             value={formData.shippingAddress.street}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="shippingAddress.city"
// //             placeholder="City"
// //             value={formData.shippingAddress.city}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="shippingAddress.state"
// //             placeholder="State"
// //             value={formData.shippingAddress.state}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="shippingAddress.zipcode"
// //             placeholder="Zip Code"
// //             value={formData.shippingAddress.zipcode}
// //             onChange={handleChange}
// //           />
// //           <input
// //             type="text"
// //             name="shippingAddress.country"
// //             placeholder="Country"
// //             value={formData.shippingAddress.country}
// //             onChange={handleChange}
// //           />

// //           <button type="submit">Save Changes</button>
// //           {message && <p>{message}</p>}
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyAccount;

//3rd

import React, { useEffect, useState } from 'react';
import './index.scss';
import { getProfile, updateProfile } from '../../../services/api';

const MyAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        const userData = res.data?.data; // fixed

        console.log('Fetched user:', userData);

        setFormData((prev) => ({
          ...prev,
          ...userData,
          address: {
            ...prev.address,
            ...(userData.address || {}),
          },
        }));
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Failed to update profile.');
    }
  };

  // Define the fields for dynamic mapping
  const fields = [
    { name: 'username', placeholder: 'Username' },
    { name: 'email', placeholder: 'Email' },
    { name: 'phone', placeholder: 'Phone Number' },
    { name: 'address.street', placeholder: 'Street' },
    { name: 'address.city', placeholder: 'City' },
    { name: 'address.state', placeholder: 'State' },
    { name: 'address.zipcode', placeholder: 'Zip Code' },
    { name: 'address.country', placeholder: 'Country' },
  ];

  return (
    <div className="account-page">
      <h2>My Account</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => {
            const fieldValue = field.name
              .split('.')
              .reduce(
                (obj, key) => (obj && obj[key] !== undefined ? obj[key] : ''),
                formData
              );

            return (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={fieldValue}
                onChange={handleChange}
              />
            );
          })}

          <button type="submit">Save Changes</button>
          {message && <p>{message}</p>}
        </form>
      )}
    </div>
  );
};

export default MyAccount;
