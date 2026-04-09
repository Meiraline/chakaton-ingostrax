import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/4_unity/Layout';
import Header from '../components/3_organism/Header';
import FooterSection from '../components/3_organism/FooterSection';
import SectionTitle from '../components/1_atoms/SectionTitle';
import { useAuth } from '../hooks/useAuth';
import gameService from '../api/gameService';

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
      const response = await gameService.getBackground(difficultyFromState, sessionGameID);
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
      const response = await gameService.getRound(sessionGameID);
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
      const result = await gameService.submitRound(sessionGameID, playerAnswer.trim());
      const currentRound = round;
      const nextRound = await gameService.getRound(sessionGameID);

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
      setHistoryIndex((prev) => (prev === -1 ? 0 : prev + 1));
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

  return (
    <Layout>
      <Header />
      <main className="game-page">
        <section className="game-hero">
          <div className="game-hero__top">
            <SectionTitle title="Игровая сессия" subtitle={`Персонаж: ${location.state?.fullName || ''}`} />
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
            <div className="situation-panel">
              <div className="situation-card">
                <div className="situation-card__header">
                  <h3>Ситуация</h3>
                </div>
                <div className="situation-card__body">
                  {roundLoading || loading ? (
                    <p>Загрузка...</p>
                  ) : (
                    <>
                      <p>{round?.event?.description || round?.event?.title || 'Ситуация пока отсутствует.'}</p>
                      {lastResult && (
                        <div className="situation-answer">
                          <p className="situation-answer__title">Ваш ответ:</p>
                          <p>{lastResult.answer}</p>
                          <p className="situation-answer__title">Последствия:</p>
                          <p>{lastResult.consequence || 'Нет данных.'}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="situation-card__footer">
                  <span>Возраст: {currentStatus.age ?? '-'}</span>
                </div>
              </div>

              <div className="input-panel">
                <label className="input-label">Решение ситуации</label>
                <textarea
                  value={playerAnswer}
                  onChange={(e) => setPlayerAnswer(e.target.value)}
                  placeholder="Опишите, что делает персонаж"
                  disabled={sendLoading || isFinished}
                />
                <div className="input-actions">
                  {!lastResult ? (
                    <button className="button button--primary" onClick={handleSend} disabled={sendLoading || !playerAnswer.trim() || isFinished}>
                      {sendLoading ? 'Отправка...' : 'Отправить'}
                    </button>
                  ) : (
                    <button className="button button--primary" onClick={handleNextRound} disabled={roundLoading || isFinished}>
                      Следующий раунд
                    </button>
                  )}
                </div>

                {history.length > 0 && (
                  <div className="history-controls">
                    <button className="button button--secondary" type="button" onClick={handleHistoryPrev} disabled={historyIndex <= 0}>
                      ←
                    </button>
                    <span>{historyIndex + 1} / {history.length}</span>
                    <button className="button button--secondary" type="button" onClick={handleHistoryNext} disabled={historyIndex >= history.length - 1}>
                      →
                    </button>
                  </div>
                )}

                {currentHistory && (
                  <div className="history-card">
                    <p><strong>Ситуация:</strong> {currentHistory.question}</p>
                    <p><strong>Ваш ответ:</strong> {currentHistory.answer}</p>
                    <p><strong>Последствия:</strong> {currentHistory.consequence}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="character-panel">
              <div className="character-card character-card--profile">
                <div className="character-card__avatar">
                  <img src="/icons/health.svg" alt="Персонаж" />
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
