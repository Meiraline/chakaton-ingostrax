import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import SectionTitle from '../components/1_atoms/SectionTitle';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Пароли не совпадают');
      return;
    }

    try {
      await register(name, surname, username, password);
      navigate('/account');
    } catch (err) {
      setLocalError(err.message || 'Registration failed');
    }
  };

  const displayError = localError || error;

  return (
    <Layout>
      <Header />
      <main className="auth-page">
        <section className="auth-hero">
          <div className="auth-hero__text">
            <SectionTitle
              title="Перед началом игры создай аккаунт"
              subtitle="Так мы сможем сохранить твои достижения и статистику"
            />
            <p className="auth-hero__description">
              Придумайте имя и пароль для входа, чтобы закрепить прогресс и возвращаться к игре позже.
            </p>
          </div>
          <div className="auth-card auth-card--blue">
            <h2 className="auth-card__title">Регистрация</h2>
            {displayError && <div className="auth-error">{displayError}</div>}
            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span>Имя</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Введите имя"
                  required
                  disabled={loading}
                />
              </label>
              <label className="auth-field">
                <span>Фамилия</span>
                <input
                  type="text"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                  placeholder="Введите фамилию"
                  required
                  disabled={loading}
                />
              </label>
              <label className="auth-field">
                <span>Имя пользователя</span>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Придумайте имя пользователя"
                  required
                  disabled={loading}
                />
              </label>
              <label className="auth-field">
                <span>Пароль</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Введите пароль"
                  required
                  disabled={loading}
                />
              </label>
              <label className="auth-field">
                <span>Повтори пароль</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Повторите пароль"
                  required
                  disabled={loading}
                />
              </label>
              <div className="auth-actions">
                <button className="button button--primary" type="submit" disabled={loading}>
                  {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                </button>
                <Link className="auth-switch-link" to="/login">
                  У меня уже есть аккаунт
                </Link>
              </div>
            </form>
            <p className="auth-note">
              *На данный момент проект находится на стадии прототипа, поэтому возможны ошибки и баги.
            </p>
          </div>
        </section>
      </main>
      <FooterSection />
    </Layout>
  );
}

export default RegisterPage;
