import React, { useEffect, useState, useCallback } from 'react';
import { createSession, deleteSession, getBackground } from '../../api/game';
import './CharacterCreationModal.css';

function CharacterCreationModal({ visible, onClose, onCreate, onCreated, loading, error }) {
  const [name, setName] = useState('Иван');
  const [difficulty, setDifficulty] = useState('EASY');
  const [sessionId, setSessionId] = useState(null);
  const [background, setBackground] = useState('');
  const [status, setStatus] = useState(null);
  const [regenLoading, setRegenLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const resetState = () => {
    setSessionId(null);
    setBackground('');
    setStatus(null);
    setLocalError(null);
  };

  useEffect(() => {
    if (visible) {
      resetState();
    }
  }, [visible]);

  const cleanupSession = useCallback(async () => {
    if (sessionId) {
      try {
        await deleteSession(sessionId);
      } catch (err) {
        // ignore cleanup errors
      }
      setSessionId(null);
    }
  }, [sessionId]);

  const generateBackground = async () => {
    if (!name.trim()) {
      setLocalError('Введите имя персонажа');
      return;
    }

    setLocalError(null);
    setRegenLoading(true);

    try {
      if (sessionId) {
        try {
          await deleteSession(sessionId);
        } catch (cleanupError) {
          console.warn('Не удалось удалить старую сессию', cleanupError);
        }
      }

      const sessionResponse = await createSession({ fullName: name.trim() });
      const newSessionId = sessionResponse?.id || sessionResponse?.sessionGameID || sessionResponse?.session_id;
      if (!newSessionId) {
        throw new Error('Не удалось создать персонажа');
      }

      setSessionId(newSessionId);
      const backgroundResponse = await getBackground(difficulty, newSessionId);
      setBackground(backgroundResponse?.background || 'Предыстория пока не готова.');
      setStatus(backgroundResponse?.status || null);
    } catch (err) {
      setLocalError(err.message || 'Ошибка при генерации предыстории');
    } finally {
      setRegenLoading(false);
    }
  };

  const handleStart = async () => {
    if (!sessionId || !background) {
      setLocalError('Сначала сгенерируйте предысторию');
      return;
    }

    setStartLoading(true);
    try {
      await onCreate({ sessionId, name, difficulty });
      if (onCreated) {
        await onCreated();
      }
    } catch (err) {
      setLocalError(err.message || 'Не удалось начать игру');
    } finally {
      setStartLoading(false);
    }
  };

  const handleClose = async () => {
    await cleanupSession();
    onClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Создание персонажа</h3>
          <button type="button" className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>

        {(error || localError) && <div className="auth-error">{error || localError}</div>}

        <div className="modal-form">
          <label className="modal-field">
            <span>Имя персонажа</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Иван"
              disabled={regenLoading || startLoading}
            />
          </label>

          <label className="modal-field">
            <span>Сложность</span>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              disabled={regenLoading || startLoading}
            >
              <option value="EASY">легко</option>
              <option value="MEDIUM">нормально</option>
              <option value="HARD">сложно</option>
            </select>
          </label>

          <div className="creation-preview">
            <div className="creation-preview__block">
              <span className="creation-preview__label">Предыстория</span>
              <div className="creation-preview__text">
                {background || 'Нажмите «Перегенерировать», чтобы получить предысторию.'}
              </div>
            </div>
            <div className="creation-preview__block">
              <span className="creation-preview__label">Стартовые характеристики</span>
              <div className="creation-metrics">
                <div className="creation-metric">
                  <span>Здоровье</span>
                  <strong>{status?.health ?? '-'}</strong>
                </div>
                <div className="creation-metric">
                  <span>Счастье</span>
                  <strong>{status?.happiness ?? '-'}</strong>
                </div>
                <div className="creation-metric">
                  <span>Деньги</span>
                  <strong>{status?.money ?? '-'}</strong>
                </div>
                <div className="creation-metric">
                  <span>Доход / год</span>
                  <strong>{status?.annualSavings ?? '-'}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions modal-actions--full">
            <button
              type="button"
              className="button button--secondary"
              onClick={generateBackground}
              disabled={regenLoading || startLoading}
            >
              {regenLoading ? 'Перегенерация...' : 'Перегенерировать'}
            </button>
            <button
              type="button"
              className="button button--primary"
              onClick={handleStart}
              disabled={startLoading || regenLoading || !background}
            >
              {startLoading ? 'Загрузка...' : 'Начать игру'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreationModal;
