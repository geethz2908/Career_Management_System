import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState({
    companyName: '',
    industry: '',
    companyDescription: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://localhost:5001/companies/${id}`);
        if (!response.ok) throw new Error('Company not found');
        const data = await response.json();
        setCompany({
          companyName: data.company_name,
          industry: data.industry,
          companyDescription: data.company_description,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch company details');
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('companyName', company.companyName);
    formData.append('industry', company.industry);
    formData.append('companyDescription', company.companyDescription);
    if (image) formData.append('companyImage', image);

    try {
      const response = await fetch(`http://localhost:5001/companies/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update company');
      navigate('/dashboardCompany');
    } catch (err) {
      setError('Failed to update company');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-xl">Loading...</span>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-red-500 text-xl">{error}</span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Update Company</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-medium">
            Company Name
          </label>
          <input
            type="text"
            value={company.companyName}
            onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">
            Industry
          </label>
          <input
            type="text"
            value={company.industry}
            onChange={(e) => setCompany({ ...company, industry: e.target.value })}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">
            Description
          </label>
          <textarea
            value={company.companyDescription}
            onChange={(e) => setCompany({ ...company, companyDescription: e.target.value })}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">
            Company Image
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2"
        >
          Update Company
        </button>
      </form>
    </div>
  );
};

export default UpdateCompany;