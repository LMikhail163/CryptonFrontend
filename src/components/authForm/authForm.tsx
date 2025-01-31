type PropsType =  {
    isRegister: boolean;
    setIsRegister: (isRegister: boolean) => void;
}

export const FooterForm = ({ setIsRegister, isRegister }: PropsType) => {
  return (
    <>
        <p className="mt-4 mb-6">
            {isRegister ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
            <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-blue-500 cursor-pointer hover:underline"
            >
                {isRegister ? 'Регистрация' : 'Войти'}
            </button>
        </p>

        <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white cursor-pointer rounded-md hover:bg-blue-600"
        >
            {isRegister ? 'Войти' : 'Зарегистрироваться'}
        </button>
    </>
  );
};
