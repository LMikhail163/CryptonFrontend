import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useLoginMutation } from '../api/index';
import { FooterForm } from '../components/authForm/authForm';
import { Spinner } from '../components/spinner/spinner.tsx';

export const AuthPage = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRegister && password !== confirmPassword) return;
    
    try {
      const response = isRegister
        ? await login({ email, password }).unwrap()
        : await register({ email, password }).unwrap();

      localStorage.setItem('token', response.token);
      navigate('/profile');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error?.data?.message || 'Ошибка при авторизации/регистрации');
    }
  };

  const isLoading = isRegistering || isLoggingIn;

  if (isLoading) {
    return <Spinner />
  } 

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleAuth} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? 'Авторизация' : 'Регистрация'}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Введите ваш email'
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Введите ваш пароль'
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {!isRegister && (
            <div className="mb-4">
                <label htmlFor="confirmPassword">Подтверждение пароля:</label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Подтвердите ваш пароль"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
        )}
        {confirmPassword.length >= 1 && password !== confirmPassword && (
            <p className="mb-4 text-red-500">Ошибка: Пароли не совпадают</p>
        )}

        <FooterForm isRegister={isRegister} setIsRegister={setIsRegister}/>
      </form>
    </div>
  );
};