import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetProfileQuery } from '../api/index';
import { SkeletonProfile } from '../components/skeletonProfile/skeletonProfile.tsx';

export const ProfilePage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);


  if (isLoading) {
    return <SkeletonProfile />;
  }

  if (!data || error) return <div>Ошибка при загрузке профиля.</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Профиль</h2>
        <p className="mb-4 text-sm text-gray-700">
          Ваш Email: <span className="font-semibold">{data.email}</span>
        </p>
        <p className="mb-6 text-sm text-gray-700">
          Ваш ID: <span className="font-semibold">{data.id}</span>
        </p>
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};