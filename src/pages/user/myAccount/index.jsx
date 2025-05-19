import { useEffect, useState } from 'react';
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
