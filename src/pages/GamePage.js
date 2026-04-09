import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import SectionTitle from '../components/1_atoms/SectionTitle';
import { useAuth } from '../hooks/useAuth';
import { getBackground, getRound, submitRound } from '../api/game';
import './GamePage.css';

const statLabels = {
  health: 'Здоровье',
  happiness: 'Счастье',
  money: 'Деньги',
  annualSavings: 'Доход / год',
  age: 'Возраст',
};

const statIcons = {
  health: '/icons/health.svg',
  happiness: '/icons/mood.svg',
  money: '/icons/money.svg',
  annualSavings: '/icons/income.svg',
  age: '/icons/health.svg',
};

function GamePage() {
  const { sessionGameID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [background, setBackground] = useState(null);
  const [round, setRound] = useState(null);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [roundLoading, setRoundLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const difficultyFromState = location.state?.difficulty || 'MEDIUM';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const loadBackground = useCallback(async () => {
    if (!sessionGameID) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await getBackground(difficultyFromState, sessionGameID);
      setBackground(response);
      setIsFinished(response?.status?.isFinish || false);
    } catch (err) {
      setError(err.message || 'Не удалось загрузить предысторию.');
    } finally {
      setLoading(false);
    }
  }, [sessionGameID, difficultyFromState]);

  const loadRound = useCallback(async () => {
    if (!sessionGameID) {
      return;
    }

    setError(null);
    setRoundLoading(true);

    try {
      const response = await getRound(sessionGameID);
      setRound(response);
      if (response?.status?.isFinish) {
        setIsFinished(true);
      }
    } catch (err) {
      setError(err.message || 'Не удалось загрузить ход.');
    } finally {
      setRoundLoading(false);
    }
  }, [sessionGameID]);

  useEffect(() => {
    if (sessionGameID) {
      loadBackground();
      loadRound();
    }
  }, [sessionGameID, loadBackground, loadRound]);

  const handleSend = async () => {
    if (!playerAnswer.trim()) {
      setError('Введите решение ситуации.');
      return;
    }

    setError(null);
    setSendLoading(true);

    try {
      const result = await submitRound(sessionGameID, playerAnswer.trim());
      const currentRound = round;
      const nextRound = await getRound(sessionGameID);

      setLastResult({ answer: playerAnswer.trim(), result, previousRound: currentRound });
      setHistory((prev) => [
        ...prev,
        {
          question: currentRound?.event?.title || currentRound?.event?.description || 'Ситуация не найдена.',
          answer: playerAnswer.trim(),
          consequence: result?.report || JSON.stringify(result, null, 2),
          status: nextRound?.status || currentRound?.status,
        },
      ]);
      setHistoryIndex(-1);
      setRound(nextRound);
      setPlayerAnswer('');
      if (nextRound?.status?.isFinish) {
        setIsFinished(true);
      }
    } catch (err) {
      setError(err.message || 'Не удалось отправить решение.');
    } finally {
      setSendLoading(false);
    }
  };

  const handleNextRound = async () => {
    setError(null);
    if (history.length === 0) {
      return;
    }

    setRoundLoading(true);
    try {
      await loadRound();
      setLastResult(null);
      setHistoryIndex(-1);
    } catch (err) {
      setError(err.message || 'Не удалось загрузить следующий раунд.');
    } finally {
      setRoundLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToAccount = () => {
    navigate('/account');
  };

  const currentHistory = historyIndex >= 0 ? history[historyIndex] : null;

  const handleHistoryPrev = () => {
    setHistoryIndex((index) => Math.max(0, index - 1));
  };

  const handleHistoryNext = () => {
    setHistoryIndex((index) => Math.min(history.length - 1, index + 1));
  };

  const currentStatus = round?.status || background?.status || {};

  // Определяем текущее событие для отображения
  const getCurrentEvent = () => {
    if (currentHistory) {
      return {
        situation: currentHistory.question,
        answer: currentHistory.answer,
        consequence: currentHistory.consequence,
      };
    }

    if (lastResult) {
      return {
        situation:
          lastResult.previousRound?.event?.description ||
          lastResult.previousRound?.event?.title ||
          'Ситуация пока отсутствует.',
        answer: lastResult.answer,
        consequence: lastResult.result?.report || JSON.stringify(lastResult.result || {}, null, 2),
      };
    }

    return {
      situation: round?.event?.description || round?.event?.title || 'Ситуация пока отсутствует.',
      answer: '',
      consequence: '',
    };
  };

  const currentEvent = getCurrentEvent();

  return (
    <Layout>
      <main className="game-page">
        <section className="game-hero">
          <div className="game-hero__top">
            <SectionTitle title={`Персонаж: ${location.state?.fullName || ''}`} />
            <div className="game-hero__actions">
              <button className="button button--secondary" onClick={handleBackToAccount}>
                Назад
              </button>
              <button className="button button--secondary" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <div className="game-grid">
            <div className="content-left">
              {/* Блок событий */}
              <div className="events-card">
                <div className="events-card__header">
                  <h3>События</h3>
                </div>

                {roundLoading || loading ? (
                  <div className="events-card__loading">
                    <p>Загрузка...</p>
                  </div>
                ) : (
                  <>
                    <div className="events-card__body">
                      <div className="event-field">
                        <label className="event-field__label">Ситуация</label>
                        <div className="event-field__content">
                          {currentEvent.situation}
                        </div>
                      </div>

                      <div className="event-field">
                        <label className="event-field__label">Ваш ответ</label>
                        <div className="event-field__content">
                          {currentEvent.answer || '—'}
                        </div>
                      </div>

                      <div className="event-field">
                        <label className="event-field__label">Последствия</label>
                        <div className="event-field__content">
                          {currentEvent.consequence || '—'}
                        </div>
                      </div>
                    </div>

                    <div className="events-card__footer">
                      <button className="button button--secondary button--small" onClick={handleHistoryPrev} disabled={historyIndex <= 0}>
                        ←
                      </button>
                      <span className="events-card__counter">{historyIndex + 1} / {Math.max(1, history.length)}</span>
                      <button className="button button--secondary button--small" onClick={handleHistoryNext} disabled={historyIndex >= history.length - 1 || history.length === 0}>
                        →
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Блок ввода */}
              <div className="input-card">
                <textarea
                  value={playerAnswer}
                  onChange={(e) => setPlayerAnswer(e.target.value)}
                  placeholder="Опишите, что делает персонаж..."
                  disabled={sendLoading || isFinished || loading}
                  className="input-card__textarea"
                />
                <div className="input-card__actions">
                  {!lastResult ? (
                    <button 
                      className="button button--primary" 
                      onClick={handleSend} 
                      disabled={sendLoading || !playerAnswer.trim() || isFinished}
                    >
                      {sendLoading ? 'Отправка...' : 'Отправить ответ'}
                    </button>
                  ) : (
                    <button 
                      className="button button--primary" 
                      onClick={handleNextRound} 
                      disabled={roundLoading || isFinished}
                    >
                      {roundLoading ? 'Загрузка...' : 'Перейти к следующему ходу'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Профиль персонажа справа */}
            <div className="content-right">
              <div className="character-card character-card--profile">
                <div className="character-card__avatar">
                  <img src="/png/plaier_small.png" alt="Персонаж" />
                </div>
                <div className="character-card__content">
                  <h3>{location.state?.fullName || 'Персонаж'}</h3>
                  <p className="character-card__description">{background?.background || 'Предыстория персонажа будет здесь.'}</p>
                  <div className="character-card__stats">
                    {['health', 'happiness', 'money', 'annualSavings'].map((key) => (
                      <div className="stat-line" key={key}>
                        <img src={statIcons[key]} alt={statLabels[key]} />
                        <span>{statLabels[key]}</span>
                        <strong>{currentStatus[key] ?? '-'}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isFinished && (
            <div className="finished-modal">
              <div className="finished-modal__panel">
                <h3>Игра окончена</h3>
                <p>{round?.event?.description || round?.event?.title || 'Последний ход завершён.'}</p>
                <button className="button button--primary" onClick={handleBackToAccount}>
                  Назад в главное меню
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      <FooterSection />
    </Layout>
  );
}

export default GamePage;
