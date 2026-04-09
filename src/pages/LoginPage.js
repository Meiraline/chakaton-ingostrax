import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import SectionTitle from '../components/1_atoms/SectionTitle';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');

    try {
      await login(username, password);
      navigate('/account');
    } catch (err) {
      setLocalError(err.message || 'Login failed');
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
              title="Перед началом игры зайди в аккаунт"
              subtitle="Так мы сможем сохранить твои достижения и статистику"
            />
            <p className="auth-hero__description">
              Введите имя и пароль, чтобы получить доступ к своему профилю и продолжить игру.
            </p>
          </div>
          <div className="auth-card auth-card--blue">
            <h2 className="auth-card__title">Вход</h2>
            {displayError && <div className="auth-error">{displayError}</div>}
            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span>Имя пользователя</span>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Введите имя пользователя"
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
              <div className="auth-actions">
                <button className="button button--primary" type="submit" disabled={loading}>
                  {loading ? 'Загрузка...' : 'Войти'}
                </button>
                <Link className="auth-switch-link" to="/register">
                  У меня нет аккаунта
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

export default LoginPage;
