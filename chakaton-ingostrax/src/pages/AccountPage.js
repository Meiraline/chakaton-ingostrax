import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import CharacterCreationModal from '../components/3_organism/CharacterCreationModal';
import { useAuth } from '../hooks/useAuth';

function AccountPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createError, setCreateError] = useState(null);

  const getStorageKey = React.useCallback(() => {
    if (user?.id) {
      return `savedGameSessions_${user.id}`;
    }
    if (user?.username) {
      return `savedGameSessions_${user.username}`;
    }
    return 'savedGameSessions_guest';
  }, [user?.id, user?.username]);

  const getSavedSessions = React.useCallback(() => {
    try {
      const raw = localStorage.getItem(getStorageKey());
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, [getStorageKey]);

  const saveSessions = React.useCallback((items) => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [getStorageKey]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const loadSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const saved = getSavedSessions();
        setSessions(saved);
      } catch (err) {
        setError('Не удалось загрузить персонажей.');
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, [isAuthenticated, user?.id, user?.username, getSavedSessions]);

  const openCreateModal = () => {
    setCreateError(null);
    setModalOpen(true);
  };

  const closeCreateModal = () => {
    setModalOpen(false);
  };

  const handleSelectSession = (session) => {
    if (session.isFinish) {
      return;
    }

    navigate(`/game/${session.id}`, {
      state: {
        fullName: session.fullName,
        difficulty: session.difficulty || 'MEDIUM',
      },
    });
  };

  const handleCreateGame = async ({ sessionId, name, difficulty }) => {
    setModalOpen(false);
    const nextSession = { id: sessionId, fullName: name, difficulty, isFinish: false };
    const updated = [nextSession, ...sessions];
    setSessions(updated);
    saveSessions(updated);
    navigate(`/game/${sessionId}`, { state: { fullName: name, difficulty } });
  };

  const refreshSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = getSavedSessions();
      const sessionList = Array.isArray(response) ? response : [];
      setSessions(sessionList);
      saveSessions(sessionList);
    } catch (err) {
      setSessions(getSavedSessions());
      if (!getSavedSessions().length) {
        setError('Не удалось обновить список персонажей.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <Header />
      <main className="account-page">
        <section className="account-hero">
          <div className="account-hero__top">
            <div>
              <h1>{user?.name} {user?.surname}</h1>
              <p className="account-subtitle">Список ваших персонажей в игре.</p>
            </div>
            <button className="button button--primary" onClick={logout}>
              Выход
            </button>
          </div>

          <div className="account-hero__title">
            <h2>Персонажи</h2>
          </div>

          {error && <div className="auth-error">{error}</div>}
          {loading && <p className="account-loading">Загрузка персонажей...</p>}
          {!loading && !sessions.length && (
            <p className="account-empty">У вас пока нет персонажей. Создайте первого.</p>
          )}

          <div className="characters-list">
            {sessions.map((session) => (
              <button
                key={session.id}
                type="button"
                className={`character-card ${session.isFinish ? 'character-card--finished' : ''}`}
                onClick={() => handleSelectSession(session)}
                disabled={session.isFinish}
              >
                <div className="character-card__info">
                  <span className="character-card__name">{session.fullName}</span>
                  {session.isFinish ? <span className="character-card__status">игра окончена</span> : <span>продолжить</span>}
                </div>
              </button>
            ))}

            <button type="button" className="character-card character-card--add" onClick={openCreateModal}>
              <span className="character-card--add-icon">+</span>
              <span>Создать нового персонажа</span>
            </button>
          </div>

          <CharacterCreationModal
            visible={modalOpen}
            onClose={closeCreateModal}
            onCreate={handleCreateGame}
            onCreated={refreshSessions}
            loading={false}
            error={createError}
          />
        </section>
      </main>
      <FooterSection />
    </Layout>
  );
}

export default AccountPage;
